import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import PageContainer from "./components/page_container/PageContainer.js";

import ZoneMenu from "./components/zone-menu/ZoneMenu.js";

import OrdersDisplay from "./pages/orders/OrdersDisplay.js";
import OrderDetails from "./pages/orders/OrderDetails.js";

import AddPage from "./pages/add/AddPage.js";

import RemovePage from "./pages/remove/RemovePage.js";

import './styles/styles.css'

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageContainer />,
            children: [
                {
                    path: "depositos/:deposit/:zone",
                    element: <ZoneMenu />,
                    children: [
                        {
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
                            path: "añadir",
                            element: <AddPage />,
                        }
                        ,
                        {
                            path: "remover",
                            element: <RemovePage />,
                        }
                    ]
                },
            ],
        },
    ]);

    return(

        <>
            <RouterProvider router={router} />
        </>

    );

}

export default App;