import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const SideBar = ({ states, handlecurrentStatus, currentStatus }) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {states.map((s, i) => (
                        <ListItemButton key={`${s.status}-LIB-${i}`} onClick={(e) => handlecurrentStatus(e, s.status)} selected={currentStatus === s.status}>
                            <ListItemIcon key={`${s.status}-LII-${i}`}>
                                <s.icon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography align='left' variant='button'>{s.status}</Typography>} />
                            <ListItemText secondary={<Typography align='right' variant='subtitle2'>{s.count}</Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default SideBar;