import React, { useState, useEffect, useContext } from 'react';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
