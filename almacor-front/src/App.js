import { useState } from "react";

import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

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

import './styles/styles.css'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#009c7d',
        },
        secondary: {
          main: '#de1c47',
        },
        background: {
          default: '#e9ecef',
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
          fontWeight: 500,
        },
        h4: {
          fontSize: 20,
          fontWeight: 500,
        },
        h5: {
            fontSize: 16,
            fontWeight: 500
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
  }
);

function App() {

    const [currentCompany, setCurrentCompany] = useState("3")
    const [currentDeposit, setCurrentDeposit] = useState(
      localStorage.getItem("deposit")
    );

    const setLocalDeposit = value => {
      try {
        setCurrentDeposit(value)
        localStorage.setItem("deposit", value)
      } catch (error) {
        console.log(error);
      }
    }

    const [currentZone, setCurrentZone] = useState(
      localStorage.getItem("zone")
    );


    const setLocalZone = value => {
      try {
        setCurrentZone(value)
        localStorage.setItem("zone", value)
      } catch (error) {
        console.log(error);
      }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/depositos" />,
        }
        ,
        {
            path: "depositos/",
            element: <MainPage />,
        }
        ,
        {
            path: "depositos/:deposit",
            element: <ZonesPage />,
        },
        {
            path: "depositos/:deposit/:zone",
            element: <ZoneMenu />,
            children: [{
                path: "ordenes",
                element: <OrdersDisplay />,
            }
            ,
            {
                path: "ordenes/:order",
                element: <OrderDetails />,
            }
            ,
            {
                path: "ubicar",
                element: <LocatePageStep1 />,
            }
            ,
            {
              path: "ubicar/:pallet",
              element: <LocatePageStep2 />,
            }
            ,
            {
                path: "ubicar/:pallet/ubicacion",
                element: <LocatePageStep3 />,
            }
            ,
            {
                path: "remover",
                element: <RemovePage />
            }
        ]
        }
    ]);

    return(

        <>
            <ContextConnected.Provider value={{
                currentCompany,
                currentDeposit,
                currentZone,
                setCurrentCompany,
                setCurrentDeposit,
                setCurrentZone,
                setLocalDeposit,
                setLocalZone,
            }}>

                <ThemeProvider theme={theme}>

                    <RouterProvider router={router} />

                </ThemeProvider>

            </ContextConnected.Provider>
        </>

    );

}

export default App;