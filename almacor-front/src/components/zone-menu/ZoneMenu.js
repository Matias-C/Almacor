import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import { Typography } from "@mui/material";

import OrdersIcon from "@mui/icons-material/LocalShippingRounded";
import LocateIcon from "@mui/icons-material/AddLocationAltRounded";
import RemoveIcon from "@mui/icons-material/WrongLocationRounded";
import SearchIcon from "@mui/icons-material/Search";
import UnifyIcon from "@mui/icons-material/Dns";
import InventoryIcon from "@mui/icons-material/ViewQuiltRounded";

import AppContainer from "../app_container/AppContainer";
import SideBarButton from "./SideBarButton";
import BackButton from "../back_button/BackButton";

import ContextConnected from "../../context/ContextConnected";

import "./ZoneMenu.css";

function ZoneMenu() {
    const Connected = useContext(ContextConnected);

    const [handleOpenSideBar, setHandleOpenSideBar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [page, setPage] = useState("");

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
                            {/* ORDERS BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="orders"
                                urlPage="ordenes"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <OrdersIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Órdenes" : ""}
                            </SideBarButton>

                            {/* LOCATE BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="locate"
                                urlPage="ubicar"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <LocateIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Ubicar" : ""}
                            </SideBarButton>

                            {/* REMOVE BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="remove"
                                urlPage="remover"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <RemoveIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Remover" : ""}
                            </SideBarButton>

                            {/* FIND BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="find"
                                urlPage="localizar"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <SearchIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Localizar" : ""}
                            </SideBarButton>

                            {/* UNIFY BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="unify"
                                urlPage="unificar"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <UnifyIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Unificar" : ""}
                            </SideBarButton>

                            {/* INVENTORY BUTTON */}

                            <SideBarButton
                                page={page}
                                currentPage="inventory"
                                urlPage="inventario"
                                handleClose={handleClose}
                                setPage={setPage}
                            >
                                <InventoryIcon
                                    className={
                                        Connected.openSideBar
                                            ? "zone-menu-side-bar-icon open"
                                            : "zone-menu-side-bar-icon"
                                    }
                                />
                                {Connected.openSideBar ? "Inventario" : ""}
                            </SideBarButton>
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
