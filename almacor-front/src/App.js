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
          element: <ZoneMenu />
        },
      ]);

    return(

        <>
            <PageContainer>

                <RouterProvider router={router} />

            </PageContainer>
        </>

    );

}

export default App;