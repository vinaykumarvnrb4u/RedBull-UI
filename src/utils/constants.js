import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import FlashOnSharpIcon from '@mui/icons-material/FlashOnSharp';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import QueryBuilderSharpIcon from '@mui/icons-material/QueryBuilderSharp';
import DynamicFeedSharpIcon from '@mui/icons-material/DynamicFeedSharp';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReplayIcon from '@mui/icons-material/Replay';

export const states = [
    {
        status: 'active',
        count: 0,
        icon: () => <FlashOnSharpIcon />,
        actions: [{
            name: 'info',
            icon: () => <InfoIcon fontSize="inherit" />
        }, {
            name: 'retry',
            icon: () => <ReplayIcon fontSize="inherit" />
        }, {
            name: 'delete',
            icon: () => <DeleteForeverIcon fontSize="inherit" />
        }]
    },
    {
        status: 'pending',
        count: 0,
        icon: () => <QueryBuilderSharpIcon />,
        actions: [{
            name: 'info',
            icon: () => <InfoIcon fontSize="inherit" />
        }, {
            name: 'delete',
            icon: () => <DeleteForeverIcon fontSize="inherit" />
        }]
    },
    {
        status: 'completed',
        count: 0,
        icon: () => <DoneSharpIcon />,
        actions: [{
            name: 'info',
            icon: () => <InfoIcon fontSize="inherit" />
        }, {
            name: 'retry',
            icon: () => <ReplayIcon fontSize="inherit" />
        }, {
            name: 'delete',
            icon: () => <DeleteForeverIcon fontSize="inherit" />
        }]
    },
    {
        status: 'failed',
        count: 0,
        icon: () => <DangerousSharpIcon />,
        actions: [{
            name: 'info',
            icon: () => <InfoIcon fontSize="inherit" />
        }, {
            name: 'retry',
            icon: () => <ReplayIcon fontSize="inherit" />
        }, {
            name: 'delete',
            icon: () => <DeleteForeverIcon fontSize="inherit" />
        }]
    },
    {
        status: 'delayed',
        count: 0,
        icon: () => <AccessAlarmIcon />,
        actions: [{
            name: 'info',
            icon: () => <InfoIcon fontSize="inherit" />
        }, {
            name: 'delete',
            icon: () => <DeleteForeverIcon fontSize="inherit" />
        }]
    },
    {
        status: 'queues',
        count: 0,
        icon: () => <DynamicFeedSharpIcon />
    },
];

export const limit = 10;