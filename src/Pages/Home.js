import { Component } from 'react';

import Box from '@mui/material/Box';

import TopBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import Modal from '../components/Dialog';
import SnackAlert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';

import socket from '../sockets';
import { getData, getJobInfo, deleteJobById, retryJob } from '../utils/services';
import { states } from '../utils/constants';


const title = 'Red Bull';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStatus: 'active',
            data: [],
            error: null,
            states,
            dialog: false,
            dialogData: null,
            dialogButtons: [],
            dialogTitle: '',
            actions: [],
            snack: false,
            snackMessage: '',
            snackSeverity: 'success',
            showJson: false,
            showProgress: false
        }
    }

    getDetails = async (currentStatus) => {
        try {
            const { states } = this.state;
            this.setState({ showProgress: true });
            const { jobs, count } = await getData(currentStatus);
            const newStates = states.map((s) => {
                if (s.status === 'pending') s.count = count['wait'];
                else s.count = count[s.status];
                return s;
            })
            this.setState({ data: [] });
            this.setState({ data: jobs.reverse(), states: newStates, showProgress: false });
        } catch (err) {
            this.setState({ err, showProgress: false });
        }
    }

    componentDidMount() {
        this.getDetails(this.state.currentStatus);
        socket.on('count', (count) => {
            this.getDetails(this.state.currentStatus);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentStatus } = this.state;
        if (prevState.currentStatus !== currentStatus) this.getDetails(currentStatus);
    }

    handlecurrentStatus = (e, name) => {
        this.setState({
            currentStatus: name
        });
    }

    closeModal = () => {
        this.setState({ dialog: false });
    }

    handleAction = async (queue, jobId, action) => {
        if (!queue || !jobId) return;
        try {
            this.setState({ showProgress: true });
            if (action === 'info') {
                let dialogData = {};
                if (!this.state.dialog && queue && jobId) {
                    dialogData = await getJobInfo(queue, jobId);
                    this.setState({
                        dialog: true,
                        dialogData,
                        showProgress: false
                    });
                }
            } else if (action === 'delete') {
                this.closeModal();
                const res = await deleteJobById(queue, jobId);
                this.setState({
                    snack: true,
                    snackMessage: res.message,
                    showProgress: false
                });
            } else if (action === 'retry') {
                this.closeModal();
                const res = await retryJob(queue, jobId);
                this.setState({
                    snack: true,
                    snackMessage: res.message,
                    snackSeverity: 'success',
                    showProgress: false
                });
            }
        }
        catch (err) {
            this.setState({
                snack: true,
                snackMessage: err.message,
                snackSeverity: 'error',
                showProgress: false
            });
        }
    }

    dialogHandler = (e, queue, jobId, action) => {
        const dialogButtons = [
            {
                label: 'YES',
                onClick: () => this.handleAction(queue, jobId, action)
            },
            {
                label: 'NO',
                onClick: () => this.closeModal()
            }
        ];
        if (action === 'info') {
            this.setState({
                dialogButtons: [{ label: 'cancel', onClick: () => this.closeModal() }],
                showJson: true,
                dialogTitle: 'Info'
            })
            this.handleAction(queue, jobId, action);
        }
        else if (action === 'delete') {
            this.setState({
                dialog: true,
                dialogData: 'Are you sure, you want to delete?',
                dialogButtons,
                showJson: false,
                dialogTitle: 'Delete'
            });
        }
        else if (action === 'retry') {
            this.setState({
                dialog: true,
                dialogData: 'Are you sure, you want to retry?',
                dialogButtons,
                showJson: false,
                dialogTitle: 'Retry'
            });
        }
    }

    closeSnack = () => this.setState({ snack: false, snackMessage: '' })

    render() {
        const { currentStatus, data, states, dialog, dialogData, dialogButtons, dialogTitle, snack, snackMessage, snackSeverity, showJson, showProgress } = this.state;
        const { actions } = states.find(s => s.status === currentStatus);
        return (
            <Box sx={{ display: 'flex' }}>
                <TopBar title={title} />
                <SideBar states={states} currentStatus={currentStatus} handlecurrentStatus={this.handlecurrentStatus} />
                {/* <Toolbar /> */}
                <Box component="main" sx={{ flexGrow: 1, mt: 9, ml: 2, mr: 1 }}>
                    {showProgress && <ProgressBar />}
                    <h4>{currentStatus.toUpperCase()}</h4>
                        <Table data={data} handleAction={this.dialogHandler} actions={actions} />
                    <Modal dialog={dialog} data={dialogData} closeModal={this.closeModal} dialogButtons={dialogButtons} showJson={showJson} dialogTitle={dialogTitle} />
                    <SnackAlert snack={snack} snackMessage={snackMessage} snackSeverity={snackSeverity} closeSnack={this.closeSnack} />
                </Box>
            </Box>
        )
    }
}

export default Home;