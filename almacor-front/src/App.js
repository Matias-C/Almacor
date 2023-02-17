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
import AddPage from "./pages/add/AddPage.js";

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
            },
            {
                path: "ubicar",
                element: <AddPage />,
            }
            ,
            {
                path: "inventario"
            }
        ]
        }
    ]);

    return(

        <>
            <ThemeProvider theme={theme}>

                <RouterProvider router={router} />

            </ThemeProvider>
        </>

    );

}

export default App;