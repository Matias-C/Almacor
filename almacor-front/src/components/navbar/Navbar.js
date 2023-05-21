import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import ContextConnected from "../../context/ContextConnected";

import "./Navbar.css";

function Navbar() {
    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const logout = async () => {
        Connected.setUserInfo(null);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (
        <AppBar position="static" className="nav-cont">
            <Toolbar className="nav">
                <IconButton
                    size="large"
                    color="inherit"
                    className="nav-icon-button"
                    onClick={() => {
                        Connected.setOpenSideBar(!Connected.openSideBar);
                    }}
                >
                    <MenuIcon className="nav-icon" />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Depósito
                </Typography>

                <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => {
                        logout();
                    }}
                >
                    <LogoutIcon className="nav-icon" />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
