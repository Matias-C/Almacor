import { useState } from "react";

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

                <h1 className="page-content-header"><span className="header-deposit">Secos</span> <span className="header-zone">/ Zona 1</span></h1>

                {children}

            </div>
        </div>

    );
}

export default PageContainer;