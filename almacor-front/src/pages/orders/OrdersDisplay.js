import { useState, useEffect, useContext } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import DisplayPage from '../../components/display/DisplayPage';
import DisplayButton from '../../components/display/DisplayButton';

import ContextConnected from '../../context/ContextConnected';

import "./OrdersDisplay.css"

function OrdersDisplay() {

    const Connected = useContext(ContextConnected);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/ordenpartidascb/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setOrders(data);
            console.log(data);
          }
        };
        getOrders();
    }, []);

    return(

        <>
            <DisplayPage
                displayPageHeader="Órdenes de carga activas"
            >

                <Grid container spacing={2}>

                    {
                        orders.map((order) => {

                            return (

                                <DisplayButton
                                    key={order.n_id_pk}
                                    displayButtonType="Orden"
                                    displayButtonTypeDetail={order.n_id_orden_de_carga}
                                    displayButtonHeader={order.c_descripcion}
                                    displayButtonURL={`orden=${order.n_id_orden_de_carga}`}
                                    object={order}
                                />

                            );

                        })
                    }

                </Grid>

            </DisplayPage>
        </>

    );
}

export default OrdersDisplay;