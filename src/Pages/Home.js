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
            showProgress: false,
            pageNum: 0
        }
    }

    getDetails = async (currentStatus, pageNum = 0) => {
        try {
            const { states } = this.state;
            this.setState({ showProgress: true });
            const { jobs, count } = await getData(currentStatus, pageNum+1);
            const newStates = states.map((s) => {
                if (s.status === 'pending') s.count = count['wait'];
                else s.count = count[s.status];
                return s;
            })
            this.setState({ data: [] });
            this.setState({ data: jobs, states: newStates, showProgress: false, pageNum });
        } catch (err) {
            this.setState({ err, showProgress: false });
        }
    }

    componentDidMount() {
        this.getDetails(this.state.currentStatus);
        socket.on('count', (count) => {
            this.getDetails(this.state.currentStatus, this.state.pageNum);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentStatus } = this.state;
        if (prevState.currentStatus !== currentStatus) this.getDetails(currentStatus);
    }

    handlecurrentStatus = (e, name) => {
        this.setState({
            currentStatus: name,
            pageNum: 0
        });
    }

    closeModal = () => {
        this.setState({ dialog: false });
    }

    handleAction = async (queue, jobId, action, index) => {
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
                    showProgress: false,
                    snackSeverity: 'success'
                });
            } else if (action === 'retry') {
                this.closeModal();
                const res = await retryJob(queue, jobId);
                this.setState((prevState) => {
                    const jobs = [...prevState.data];
                    jobs.splice(index, 1);
                    
                    const states = prevState.states.map(s1 => {
                        const s = {...s1}
                        if (s.status === 'pending') s.count += 1;
                        if (s.status === prevState.currentStatus) s.count -= 1;
                        return s;
                    });
                   
                    return {
                    snack: true,
                    snackMessage: res.message,
                    snackSeverity: 'success',
                    showProgress: false,
                    data: jobs,
                    states
                    }
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

    dialogHandler = (e, queue, jobId, action, index) => {
        const dialogButtons = [
            {
                label: 'YES',
                onClick: () => this.handleAction(queue, jobId, action, index)
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

    handleChangePage = (e, pageNum) => {
        this.getDetails(this.state.currentStatus, pageNum);
    }

    render() {
        const { currentStatus, data, states, dialog, dialogData, dialogButtons, dialogTitle, snack, snackMessage, snackSeverity, showJson, showProgress, pageNum } = this.state;
        
        const { actions, count } = states.find(s => s.status === currentStatus);

        return (
            <Box sx={{ display: 'flex' }}>
                <TopBar title={title} />
                <SideBar states={states} currentStatus={currentStatus} handlecurrentStatus={this.handlecurrentStatus} />
                {/* <Toolbar /> */}
                <Box component="main" sx={{ flexGrow: 1, mt: 9, ml: 2, mr: 1 }}>
                    {showProgress && <ProgressBar />}
                    <h4>{currentStatus.toUpperCase()}</h4>
                    <Table data={data} handleAction={this.dialogHandler} actions={actions} count={count} handleChangePageNum={this.handleChangePage} page={pageNum}/>
                    <Modal dialog={dialog} data={dialogData} closeModal={this.closeModal} dialogButtons={dialogButtons} showJson={showJson} dialogTitle={dialogTitle} />
                    <SnackAlert snack={snack} snackMessage={snackMessage} snackSeverity={snackSeverity} closeSnack={this.closeSnack} />
                </Box>
            </Box>
        )
    }
}

export default Home;