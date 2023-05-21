import { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WrongLocationRoundedIcon from "@mui/icons-material/WrongLocationRounded";
import SearchIcon from "@mui/icons-material/Search";
import DnsIcon from "@mui/icons-material/Dns";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

import AppContainer from "../app_container/AppContainer";
import BackButton from "../back_button/BackButton";

import ContextConnected from "../../context/ContextConnected";

import "./ZoneMenu.css";

function ZoneMenu() {
    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [handleOpenSideBar, setHandleOpenSideBar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [page, setPage] = useState("");

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const handleSideBar = () => {
            if (handleOpenSideBar && windowWidth > 900) {
                Connected.setOpenSideBar(true);
                setHandleOpenSideBar(false);
            } else if (!handleOpenSideBar && windowWidth < 900) {
                Connected.setOpenSideBar(false);
                setHandleOpenSideBar(true);
            }
        };
        handleSideBar();
    }, [Connected, handleOpenSideBar, windowWidth]);

    useEffect(() => {
        const getUrl = () => {
            const currentUrl = window.location.href.toString();
            if (currentUrl.includes("ordenes")) {
                setPage("orders");
            } else if (currentUrl.includes("ubicar")) {
                setPage("locate");
            } else if (currentUrl.includes("remover")) {
                setPage("remove");
            } else if (currentUrl.includes("localizar")) {
                setPage("find");
            } else if (currentUrl.includes("unificar")) {
                setPage("unify");
            } else if (currentUrl.includes("inventario")) {
                setPage("inventory");
            }
        };
        getUrl();
    }, []);

    const handleOpen = (e) => {
        e.stopPropagation();
        Connected.setOpenSideBar(false);
    };

    const handleClose = () => {
        if (windowWidth < 768) {
            Connected.setOpenSideBar(false);
        } else {
            return null;
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <AppContainer>
                <div className="zone-menu-cont">
                    <div
                        className={
                            Connected.openSideBar
                                ? "zone-menu-side-bar-bg open"
                                : "zone-menu-side-bar-bg"
                        }
                        onClick={(e) => {
                            handleOpen(e);
                        }}
                    >
                        <div
                            className={
                                Connected.openSideBar
                                    ? "zone-menu-side-bar open"
                                    : "zone-menu-side-bar"
                            }
                            onClick={(e) => {
                                stopPropagation(e);
                            }}
                        >
                            <Button
                                variant={
                                    page === "orders" ? "contained" : "text"
                                }
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("ordenes", { replace: true });
                                    setPage("orders");
                                }}
                            >
                                <LocalShippingRoundedIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Órdenes" : ""}
                            </Button>

                            <Button
                                variant={
                                    page === "locate" ? "contained" : "text"
                                }
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("ubicar", { replace: true });
                                    setPage("locate");
                                }}
                            >
                                <AddLocationAltRoundedIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Ubicar" : ""}
                            </Button>

                            <Button
                                variant={
                                    page === "remove" ? "contained" : "text"
                                }
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("remover", { replace: true });
                                    setPage("remove");
                                }}
                            >
                                <WrongLocationRoundedIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Remover" : ""}
                            </Button>

                            <Button
                                variant={page === "find" ? "contained" : "text"}
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("localizar", { replace: true });
                                    setPage("find");
                                }}
                            >
                                <SearchIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Localizar" : ""}
                            </Button>

                            <Button
                                variant={
                                    page === "unify" ? "contained" : "text"
                                }
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("unificar", { replace: true });
                                    setPage("unify");
                                }}
                            >
                                <DnsIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Unificar" : ""}
                            </Button>

                            <Button
                                variant={
                                    page === "inventory" ? "contained" : "text"
                                }
                                size="large"
                                disableElevation
                                fullWidth
                                className="zone-menu-side-bar-button"
                                onClick={() => {
                                    handleClose();
                                    navigate("inventario", { replace: true });
                                    setPage("inventory");
                                }}
                            >
                                <ViewQuiltRoundedIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Inventario" : ""}
                            </Button>
                        </div>
                    </div>

                    <div className="zone-menu-content">
                        <div className="page-header">
                            <BackButton />
                            <Typography
                                variant="h5"
                                className="zone-menu-header"
                            >
                                {Connected.currentDeposit.toUpperCase()} /{" "}
                                {Connected.currentZone.toUpperCase()}
                            </Typography>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </AppContainer>
        </>
    );
}

export default ZoneMenu;
