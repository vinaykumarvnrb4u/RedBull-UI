import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/bull.png';

var classes = {
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '50%',
    maxHeight: '70%',
  },
  logoHorizontallyCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const TopBar = ({ title }) => {
  return (
    <AppBar position="fixed" sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: (theme) => theme.palette.common.black
    }}>
      <Toolbar>
        <Typography variant="h4" noWrap component="div">
          {title}
        </Typography>
        {/* <div style={classes.logoHorizontallyCenter}>
          <img src={logo} className={classes.logo} alt="logo" />
        </div> */}
      </Toolbar>
    </AppBar>
  )
}
export default TopBar;