import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import ContextConnected from '../../context/ContextConnected';

import "./Navbar.css";

const logOut = async (e) => {
    e.preventDefault();

    const token = await JSON.parse(localStorage.getItem("token"));
    if (token) {

        const b_quitado = "true";

        var formdata = new FormData();
        formdata.append("b_quitado", b_quitado);

        await fetch("https://apicd.almacorweb.com/api/v1/auth/logout/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token.access_token}`
            },
            body: formdata
        })

    }
};

function Navbar() {

    const Connected = useContext(ContextConnected);

    return (
        <AppBar position="static" className='nav-cont'>
            <Toolbar className='nav'>
                <IconButton
                    size="large"
                    color="inherit"
                    className='nav-icon-button'
                    onClick={() => {
                        Connected.setOpenSideBar(!Connected.openSideBar);
                    }}
                >
                    <MenuIcon className='nav-icon'/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Depósito
                </Typography>
                <IconButton 
                    size="large"
                    color="inherit"
                    onClick={(e) => {
                        logOut(e);
                    }}
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;