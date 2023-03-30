import React, { useState, useEffect, useContext } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import DisplayPage from '../../components/display/DisplayPage';
import DisplayButton from '../../components/display/DisplayButton';

import ContextConnected from '../../context/ContextConnected';

import "./Inventory.css"

function InventoryPage () {

    const Connected = useContext(ContextConnected);

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/inventarios/?empresa=${Connected.userInfo.n_id_empresa}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setInventory(data);
            console.log(data);
          }
        };
        getOrders();
    }, [Connected.userInfo]);

    return (
        <>
            <DisplayPage
                displayPageHeader="Inventarios"
            >

                <Grid container spacing={2}>

                    {
                        inventory.map((item) => {

                            return (

                                <DisplayButton
                                    key={item.n_id_pk}
                                    displayButtonTypeDetail={item.c_tipo_inventario === "T" ? "Total" : "Parcial"}
                                    displayButtonHeader={`Inventario ${item.n_id_inventario}`}
                                    displayButtonURL={`inventario=${item.n_id_inventario}`}
                                    object={item}
                                />

                            );

                        })
                    }

                </Grid>

            </DisplayPage>
        </>
    )
}

export default InventoryPage;
