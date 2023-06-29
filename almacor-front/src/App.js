import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import { createTheme, ThemeProvider } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Login from "./pages/login/Login.js";

import LostConnection from "./components/lost_connection/LostConnection.js";

import MainPage from "./pages/main/MainPage.js";
import ZonesPage from "./pages/zones/ZonesPage.js";

import ZoneMenu from "./components/zone-menu/ZoneMenu.js";

import OrdersDisplay from "./pages/orders/OrdersDisplay.js";
import OrderDetails from "./pages/orders/OrderDetails.js";

import LocatePageStep1 from "./pages/locate/LocatePageStep1.js";
import LocatePageStep2 from "./pages/locate/LocatePageStep2.js";
import LocatePageStep3 from "./pages/locate/LocatePageStep3.js";

import RemovePage from "./pages/remove/RemovePage.js";

import SearchPage from "./pages/search/SearchPage.js";

import UnifyPage from "./pages/unify/UnifyPage.js";

import InventoryPage from "./pages/inventory/InventoryPage.js";
import InventoryDetails from "./pages/inventory/InventoryDetails.js";

import useAlert from "./hooks/useAlert.js";

import ContextConnected from "./context/ContextConnected.js";

import "./styles/styles.css";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#009c7d",
        },
        secondary: {
            main: "#de1c47",
        },
        background: {
            default: "#e9ecef",
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        h1: {
            fontWeight: 700,
            fontSize: 32,
        },
        h2: {
            fontSize: 28,
            fontWeight: 700,
        },
        h3: {
            fontSize: 24,
            fontWeight: 700,
        },
        h4: {
            fontSize: 20,
            fontWeight: 500,
        },
        h5: {
            fontSize: 16,
            fontWeight: 500,
        },
        button: {
            fontSize: 16,
        },
        body1: {
            fontSize: 16,
            fontWeight: 300,
        },
        body2: {
            fontSize: 12,
            fontWeight: 300,
        },
    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
    const testingURL = "https://apicdtesting.almacorweb.com/";
    const productionURL = "https://apicd.almacorweb.com/";
    const currentURL = testingURL;

    const [userInfo, setUserInfo] = useState(null);

    const [openSideBar, setOpenSideBar] = useState();

    const [currentDepositId, setCurrentDepositId] = useState(
        localStorage.getItem("id-deposit"),
    );
    const [currentDeposit, setCurrentDeposit] = useState(
        localStorage.getItem("deposit"),
    );

    const {
        openAlert,
        alertType,
        alertText,
        vertical,
        horizontal,
        handleOpenAlert,
        handleCloseAlert,
    } = useAlert();

    const setLocalDeposit = (idKey, id, nameKey, name) => {
        try {
            setCurrentDepositId(id);
            localStorage.setItem(idKey, id);
            setCurrentDeposit(name);
            localStorage.setItem(nameKey, name);
        } catch (error) {
            console.log(error);
        }
    };

    const [currentZoneId, setCurrentZoneId] = useState(
        localStorage.getItem("id-zone"),
    );
    const [currentZone, setCurrentZone] = useState(
        localStorage.getItem("zone"),
    );

    const setLocalZone = (idKey, id, nameKey, name) => {
        try {
            setCurrentZoneId(id);
            localStorage.setItem(idKey, id);
            setCurrentZone(name);
            localStorage.setItem(nameKey, name);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(`${currentURL}api/v1/auth/user/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                });
                const data = await res.json();
                setUserInfo(data);
            }
        };
        loadUserFromLocalStorage();
    }, [currentURL]);

    return (
        <>
            <ContextConnected.Provider
                value={{
                    currentURL,

                    userInfo,
                    setUserInfo,

                    openSideBar,
                    setOpenSideBar,

                    currentDepositId,
                    currentDeposit,

                    currentZoneId,
                    currentZone,

                    setLocalDeposit,
                    setLocalZone,

                    handleOpenAlert,
                }}
            >
                <ThemeProvider theme={theme}>
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={2200}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical, horizontal }}
                    >
                        <Alert
                            onClose={handleCloseAlert}
                            severity={alertType}
                            sx={{ width: "100%" }}
                        >
                            {alertText}
                        </Alert>
                    </Snackbar>

                    <Offline>
                        <LostConnection />
                    </Offline>

                    <Online>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <Navigate
                                            to={
                                                userInfo === null
                                                    ? "/login"
                                                    : "/depositos"
                                            }
                                            replace={true}
                                        />
                                    }
                                />
                                <Route exact path="/login" element={<Login />} />
                                <Route
                                    exact
                                    path="/depositos"
                                    element={<MainPage />}
                                />
                                <Route
                                    exact
                                    path="/depositos/:deposit"
                                    element={<ZonesPage />}
                                />
                                <Route
                                    exact
                                    path="/depositos/:deposit/:zone"
                                    element={<ZoneMenu />}
                                >
                                    <Route
                                        exact
                                        path="ordenes"
                                        element={<OrdersDisplay />}
                                    />
                                    <Route
                                        exact
                                        path="ordenes/:order"
                                        element={<OrderDetails />}
                                    />

                                    <Route
                                        exact
                                        path="ubicar"
                                        element={<LocatePageStep1 />}
                                    />
                                    <Route
                                        exact
                                        path="ubicar/:pallet"
                                        element={<LocatePageStep2 />}
                                    />
                                    <Route
                                        exact
                                        path="ubicar/:pallet/ubicacion"
                                        element={<LocatePageStep3 />}
                                    />

                                    <Route
                                        exact
                                        path="remover"
                                        element={<RemovePage />}
                                    />

                                    <Route
                                        exact
                                        path="localizar"
                                        element={<SearchPage />}
                                    />

                                    <Route
                                        exact
                                        path="unificar"
                                        element={<UnifyPage />}
                                    />

                                    <Route
                                        exact
                                        path="inventario"
                                        element={<InventoryPage />}
                                    />
                                    <Route
                                        exact
                                        path="inventario/:inventory"
                                        element={<InventoryDetails />}
                                    />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </Online>

                    
                </ThemeProvider>
            </ContextConnected.Provider>
        </>
    );
}

export default App;
