import { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

import "./PageContainer.css"

function PageContainer({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true)

    return(

        <div className="page-cont">
            <div className={sidebarOpen ? "sidebar-state active" : "sidebar-state"}>

                <Sidebar 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

            </div>

            <div className="page-content-cont">

                <Outlet />

            </div>
        </div>

    );
}

export default PageContainer;