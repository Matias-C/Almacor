import { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import PageContainer from "./components/page_container/PageContainer.js";

import ZoneMenu from "./pages/zone-menu/ZoneMenu.js";

import './styles/styles.css'

function App() {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <PageContainer />,
          children: [
            {
              path: "Secos/Zona1",
              element: <ZoneMenu />,
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