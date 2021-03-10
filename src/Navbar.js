import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

function Navbar() {
    return (
        <div className="mb">
             <AppBar position="static">
             <Typography variant="h6"  >
            Fack Data Generator
          </Typography>
             </AppBar>
        </div>
    )
}

export default Navbar
