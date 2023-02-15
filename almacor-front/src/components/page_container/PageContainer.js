import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

import "./PageContainer.css"

function PageContainer() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const getDeposits = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch("https://apicd.almacorweb.com/api/v1/deposito/depositos/?id_empresa=3", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setDeposits(data);
            console.log(data);
          }
        };
        getDeposits();
    }, []);

    return(

        <div className="page-cont">
            <div className={sidebarOpen ? "sidebar-state active" : "sidebar-state"}>

                <Sidebar 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    deposits={deposits}
                />

            </div>

            <div className="page-content-cont">

                <Outlet />

            </div>
        </div>

    );
}

export default PageContainer;