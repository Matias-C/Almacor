import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ContextConnected from '../../context/ContextConnected';

import "./LocatePage.css"

const PalletMask = React.forwardRef(function PalletMask(props, ref) {

    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##0000000000"
            definitions={{
                '#': /[A-Z]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { value } })}
            overwrite
        />
    );
  });
  
PalletMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LocatePageStep3() {

    const Connected = useContext(ContextConnected);
    const location = useLocation();

    const deposit = parseInt(Connected.currentDepositId);
    const zone = parseInt(Connected.currentZoneId);
    const [hall, setHall] = useState("");
    const [col, setCol] = useState("");
    const [row, setRow] = useState("");

    const [locationChecked, setLocationChecked] = useState(false);

    useEffect(() => {
        const generateLocation = async () => {

            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {

                const id_empresa = Connected.userInfo.n_id_empresa;
                const id_deposito = deposit;
                const id_zona = zone;
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
                setHall(data.n_id_pasillo);
                setCol(data.n_id_columna);
                setRow(data.n_id_fila);
                console.log(data);

            }
        };
        generateLocation();
    }, [Connected.userInfo]);

    const checkLocation = async (e) => {
        e.preventDefault();

        const url = value.substr(2,10);

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/ubic_pallet/?ubic=UB${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.access_token}`
                },
            })
            const data = await res.json();
            if (data.status === "Esta posicion se encuentra vacia") {
                setLocationChecked(true);
                handleOpenAlert("Ubicación disponible", "success");
            } else {
                setLocationChecked(false);
                handleOpenAlert("Ubicación mo disponible", "error");
            }
            console.log(data, locationChecked);
        }
    };

    const locatePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const id_empresa = Connected.userInfo.n_id_empresa;
            const id_deposito = deposit;
            const id_zona = zone;
            const id_pasillo = hall;
            const id_columna = col;
            const id_fila = row;
            const id_partida = location.state.n_id_partida;

            var formdata = new FormData();
            formdata.append("id_empresa", id_empresa);
            formdata.append("id_deposito", id_deposito);
            formdata.append("id_zona", id_zona);
            formdata.append("id_pasillo", id_pasillo);
            formdata.append("id_columna", id_columna);
            formdata.append("id_fila", id_fila);
            formdata.append("id_partida", id_partida);

            const response = await fetch("https://apicd.almacorweb.com/api/v1/deposito/ubicar_pallet_en_posicion/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            data.success && handleOpenAlert("Pallet ubicado correctamente", "success");
            console.log(data);

        }
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [alert, setAlert] = useState("");

    const handleOpenDialog = () => {
        setValue("");
        setError(false);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenAlert = (alert, type) => {
        setAlertType(type);
        setAlert(alert);
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('do validate');
        }
    }

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [validPallet, setValidPallet] = useState(false);
    const [validDeposit, setValidDeposit] = useState(false);
    const [validZone, setValidZone] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "UB") {
            setValidPallet(true);
            
            if (parseInt(e.target.value.substr(2,2)) === deposit) {
                setValidDeposit(true);

                if (parseInt(e.target.value.substr(4,2)) === zone) {
                    setValidZone(true);

                    if (e.target.value.length > 11) {
                        setValidLength(true);
                        setDisabled(false);
                        setError(false)
                        
                    } else {
                        setValidLength(false);
                        setDisabled(true);
                        setError(true);
                    };
                } else {
                    setValidZone(false);
                    setDisabled(true);
                    setError(true);
                }
                
            } else {
                setValidDeposit(false);
                setDisabled(true);
                setError(true);
            };

        } else {
            setValidPallet(false);
            setDisabled(true);
            setError(true);
        };

    };

    return(

        <>
        
            <div className='add-page-header'>

                <Typography variant='h3' className='orders-header'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ubicación</Typography>
                    <hr className='separator' />

                    <div className='add-page-inputs-cont'>

                        <Typography variant='h5' className='add-page-label'>Pasillo</Typography>
                        <TextField
                            id="id-hall"
                            variant="standard"
                            value={hall}
                            onChange={(event) => {
                                setHall(event.target.value);
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                            className='add-page-input'
                            >
                        </TextField>

                        <Typography variant='h5' className='add-page-label'>Columna</Typography>
                        <TextField
                            id="id-col"
                            variant="standard"
                            value={col}
                            onChange={(event) => {
                                setCol(event.target.value);
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                            className='add-page-input'
                            >
                        </TextField>

                        <Typography variant='h5' className='add-page-label'>Nivel</Typography>
                        <TextField
                            id="id-row"
                            variant="standard"
                            value={row}
                            onChange={(event) => {
                                setRow(event.target.value);
                            }}
                            InputProps={{
                                readOnly: true,
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
                    
                </CardActions>
                <Dialog open={openDialog} onClose={handleCloseDialog}>

                    <DialogTitle>Cambiar Ubicación</DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Para cambiar la ubicación podés ingresar un código, o cambiar los valores a mano.
                        </DialogContentText>

                        <FormControl variant="standard" fullWidth margin='dense'>
                            <InputLabel htmlFor="pallet-code">Código</InputLabel>
                            <Input
                                id="pallet-code"
                                value={value}
                                error={error}
                                autoFocus
                                onChange={handleChange}
                                inputComponent={PalletMask}
                            />
                            <FormHelperText>
                                {
                                    error ? 
                                        !validPallet ? 
                                            "Código no válido" 
                                        : !validDeposit ? 
                                            "El depósito no coincide con tu depósito actual"
                                        : !validZone ?
                                            "La zona no coincide con tu zona actual"
                                        : !validPalletLength ? 
                                            "El código es demasiado corto"
                                        :""
                                    : ""
                                }
                            </FormHelperText>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            disabled={disabled}
                            className='add-page-button' 
                            onClick={(e) => {

                                const newHall = parseInt(value.substr(6,2));
                                const newCol = parseInt(value.substr(8,2));
                                const newRow = parseInt(value.substr(10,2));

                                setHall(newHall);
                                setCol(newCol);
                                setRow(newRow);

                                checkLocation(e)

                                handleCloseDialog();
                            }}
                        >
                            Aceptar
                        </Button>
                        <Button 
                            variant="outlined" 
                            className='add-page-button' 
                            onClick={(e) => {
                                handleCloseDialog();
                            }}
                        >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </Card>

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>
            
        </>
    );
}

export default LocatePageStep3;
