import { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import PageContainer from "./components/page_container/PageContainer.js";

import ZoneMenu from "./components/zone-menu/ZoneMenu.js";

import './styles/styles.css'

function App() {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <PageContainer />,
          children: [
            {
              path: ":deposit/:zone",
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