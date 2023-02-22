import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import ContextConnected from '../../context/ContextConnected';

import "./LocatePage.css"

function LocatePageStep3() {

    const Connected = useContext(ContextConnected);
    const location = useLocation();

    const [hall, setHall] = useState("");
    const [col, setCol] = useState("");
    const [row, setRow] = useState("");

    const [palletLocation, setPalletLocation] = useState([]);
    const [locationGenerated, setLocationGenerated] = useState(false);
    const [palletChecked, setPalletChecked] = useState([]);

    const generateLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const id_empresa = Connected.currentCompany;
            const id_deposito = Connected.currentDeposit;
            const id_zona = Connected.currentZone;
            const tipo_peso = location.state.n_tipopeso;
            const tipo_altura = location.state.n_tipoaltura;

            var formdata = new FormData();
            formdata.append("id_empresa", id_empresa);
            formdata.append("id_deposito", id_deposito);
            formdata.append("id_zona", id_zona);
            formdata.append("tipo_peso", tipo_peso);
            formdata.append("tipo_altura", tipo_altura);

            const response = await fetch("https://apicd.almacorweb.com/api/v1/deposito/generar_ubic_pallet/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            setPalletLocation(data);
            console.log(data);

        }
    };

    const checkLocation = async () => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            
            const palletLocationCheck = Connected.currentCompany + 
                                        Connected.currentDeposit + 
                                        Connected.currentDeposit + 
                                        palletLocation.n_id_pasillo + 
                                        palletLocation.n_id_columna + 
                                        palletLocation.n_id_fila;
            
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/ubic_pallet/?ubic=UB${palletLocationCheck}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.access_token}`
                },
            })
            const data = await res.json();
            setPalletChecked(data);
            console.log(data);
            console.log(palletLocationCheck);
        }
    };

    const locatePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const n_id_deposito = document.querySelector("#id-deposit").value;
            const n_id_zona = document.querySelector("#id-zone").value;
            const n_id_pasillo = document.querySelector("#id-hall").value;
            const n_id_columna = document.querySelector("#id-col").value;
            const n_id_fila = document.querySelector("#id-row").value;

            var formdata = new FormData();
            formdata.append("id_deposito", n_id_deposito);
            formdata.append("id_zona", n_id_zona);
            formdata.append("id_pasillo", n_id_pasillo);
            formdata.append("id_columna", n_id_columna);
            formdata.append("id_fila", n_id_fila);

            const response = await fetch("https://apicd.almacorweb.com/api/v1/deposito/ubicar_pallet_en_posicion/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            setPalletLocation(data);
            console.log(data);

        }
    };

    return(

        <>
        
            <div className='add-page-header'>

                <Typography variant='h2' className='orders-header'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ubicaion</Typography>
                    <hr className='separator' />

                    <div className='add-page-inputs-cont'>

                        <Typography variant='h5' className='add-page-label'>Depósito</Typography>
                        <TextField 
                            id="id-deposit"
                            variant="standard"
                            defaultValue={Connected.currentDeposit}
                            InputProps={{
                                readOnly: true,
                            }}
                            className='add-page-input'
                        />

                        <Typography variant='h5' className='add-page-label'>Zona</Typography>
                        <TextField 
                            id="id-zone"
                            variant="standard"
                            defaultValue={Connected.currentZone}
                            InputProps={{
                                readOnly: true,
                            }}
                            className='add-page-input'
                        />

                        <Typography variant='h5' className='add-page-label'>Pasillo</Typography>
                        <TextField
                            id="id-hall"
                            variant="standard"
                            value={locationGenerated ? palletLocation.n_id_pasillo : hall}
                            onChange={(event) => {
                                setHall(event.target.value);
                            }}
                            className='add-page-input'
                            >
                        </TextField>

                        <Typography variant='h5' className='add-page-label'>Columna</Typography>
                        <TextField
                            id="id-col"
                            variant="standard"
                            value={locationGenerated ? palletLocation.n_id_columna : col}
                            onChange={(event) => {
                                setCol(event.target.value);
                            }}
                            className='add-page-input'
                            >
                        </TextField>

                        <Typography variant='h5' className='add-page-label'>Fila</Typography>
                        <TextField
                            id="id-row"
                            variant="standard"
                            value={locationGenerated ? palletLocation.n_id_fila : row}
                            onChange={(event) => {
                                setRow(event.target.value);
                            }}
                            className='add-page-input'
                            >
                        </TextField>

                    </div>
                </CardContent>
                <CardActions>

                    <Button
                        variant="contained" 
                        size="medium"
                        className='add-page-button' 
                        disableElevation
                        onClick={(e) => {
                            locatePallet(e)
                        }}
                    >
                        Ubicar
                    </Button>

                    <Button
                        variant="outlined" 
                        size="medium"
                        className='add-page-button' 
                        disableElevation
                        onClick={(e) => {
                            generateLocation(e);
                            setLocationGenerated(true);
                        }}
                    >
                        Generar Ubicación
                    </Button>
                    
                </CardActions>
            </Card>
            
        </>
    );
}

export default LocatePageStep3;
