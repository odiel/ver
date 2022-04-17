import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { FONT_FAMILY_MAIN } from './constants';


const NavBar = () => {
    return (
        <AppBar position="static" sx={{ boxShadow: 'none' }}>
            <Toolbar>
                <Typography component="div" sx={{
                    fontFamily: FONT_FAMILY_MAIN, fontWeight: 600, fontSize: '18px'
                }}>
                    SHOPPING LIST
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
