import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DisplayDetailsPage from "../../components/display/DisplayDetailsPage";
import InventoryCard from './InventoryCard';

import ContextConnected from '../../context/ContextConnected';

import "./Inventory.css"

function InventoryDetails() {

    const Connected = useContext(ContextConnected);
    const location = useLocation();

    const [inventoryDetails, setInventoryDetails] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/inventarios_reales/?n_id_inventario=${location.state.n_id_inventario}&n_id_empresa=${location.state.n_id_empresa}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setInventoryDetails(data);
            console.log(data);
          }
        };
        getOrders();
    }, [Connected.userInfo]);

    return (
        <DisplayDetailsPage
            detailsHeaderDetail={location.state.c_tipo_inventario === "T" ? "TOTAL" : "PARCIAL"}
            detailsHeader={`Inventario ${location.state.n_id_inventario}`}
        >
            <Grid container spacing={2}>

                {
                    inventoryDetails.map(item => {

                        return (

                            <InventoryCard
                                key={item.n_id_pk}
                                itemPL={item.c_numero}
                                itemHall={item.c_pasillo}
                                itemCol={item.n_id_columna}
                                itemRow={item.n_id_fila}
                            />

                        );


                    })
                }

            </Grid> 
        </DisplayDetailsPage>
    );
}

export default InventoryDetails;