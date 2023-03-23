import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import Login from "./pages/login/Login.js";

import MainPage from "./pages/main/MainPage.js";
import ZonesPage from "./pages/zones/ZonesPage.js";

import ZoneMenu from "./components/zone-menu/ZoneMenu.js";

import OrdersDisplay from "./pages/orders/OrdersDisplay.js";
import OrderDetails from "./pages/orders/OrderDetails.js";

import LocatePageStep1 from "./pages/locate/LocatePageStep1.js";
import LocatePageStep2 from "./pages/locate/LocatePageStep2.js";
import LocatePageStep3 from "./pages/locate/LocatePageStep3.js";

import RemovePage from "./pages/remove/RemovePage.js";

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
      lineHeight: 1.2,
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

function App() {

  const testingURL = "https://apicdtesting.almacorweb.com/";
  const productionURL = "https://apicd.almacorweb.com/";

  const currentURL = testingURL;
  
  const [userInfo, setUserInfo] = useState(null);

  const [openSideBar, setOpenSideBar] = useState(false);

  const [currentDepositId, setCurrentDepositId] = useState(
    localStorage.getItem("id-deposit")
  );
  const [currentDeposit, setCurrentDeposit] = useState(
    localStorage.getItem("deposit")
  );

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
    localStorage.getItem("id-zone")
  );
  const [currentZone, setCurrentZone] = useState(
    localStorage.getItem("zone")
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
        const res = await fetch(
          `${currentURL}api/v1/auth/user/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        const data = await res.json();
        setUserInfo(data);
        console.log(data)
      }
    };
    loadUserFromLocalStorage();
  }, []);

  return (
    <>
      <ContextConnected.Provider
        value={{
          currentURL,
          productionURL,

          userInfo,
          setUserInfo,

          openSideBar,
          setOpenSideBar,

          currentDepositId,
          setCurrentDepositId,
          currentDeposit,
          setCurrentDeposit,

          currentZoneId,
          setCurrentZoneId,
          currentZone,
          setCurrentZone,

          setLocalDeposit,
          setLocalZone,
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>

              <Route exact path="/" element=<Navigate to={userInfo === null ? "/login" : "/depositos"} />/>
              <Route exact path="/login" element=<Login /> />
              <Route exact path="/depositos" element=<MainPage /> />
              <Route exact path="/depositos/:deposit" element=<ZonesPage /> />
              <Route exact path="/depositos/:deposit/:zone" element=<ZoneMenu /> >

                <Route exact path="ordenes" element=<OrdersDisplay /> />
                <Route exact path="ordenes/:order" element=<OrderDetails /> />

                <Route exact path="ubicar" element=<LocatePageStep1 /> />
                <Route exact path="ubicar/:pallet" element=<LocatePageStep2 /> />
                <Route exact path="ubicar/:pallet/ubicacion" element=<LocatePageStep3 /> />

                <Route exact path="remover" element=<RemovePage /> />

              </Route>

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ContextConnected.Provider>
    </>
  );

}

export default App;
