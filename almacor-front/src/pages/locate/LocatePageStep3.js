import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import PalletDetails from '../../components/pallet-details/PalletDetails';

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
    const navigate = useNavigate();

    const deposit = parseInt(Connected.currentDepositId);
    const zone = parseInt(Connected.currentZoneId);
    const weight = location.state.n_tipopeso;
    const height = location.state.n_tipoaltura;
    const [ub, setUb] = useState("")
    const [idHall, setIdHall] = useState("")
    const [hall, setHall] = useState("");
    const [col, setCol] = useState("");
    const [row, setRow] = useState("");

    useEffect(() => {
        const generateLocation = async () => {

            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {

                const id_empresa = Connected.userInfo.n_id_empresa;
                const id_deposito = deposit;
                const id_zona = zone;
                const tipo_peso = weight;
                const tipo_altura = height;

                var formdata = new FormData();
                formdata.append("id_empresa", id_empresa);
                formdata.append("id_deposito", id_deposito);
                formdata.append("id_zona", id_zona);
                formdata.append("tipo_peso", tipo_peso);
                formdata.append("tipo_altura", tipo_altura);

                const response = await fetch(`${Connected.currentURL}api/v1/deposito/generar_ubic_pallet/`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token.access_token}`
                    },
                    body: formdata
                })
                const data = await response.json();
                setUb(data.UB)
                setIdHall(data.n_id_pasillo)
                setHall(data.c_pasillo);
                setCol(data.n_id_columna);
                setRow(data.n_id_fila);
                console.log(data);
            }
        };
        generateLocation();
    }, [Connected.userInfo]);

    const locate = () => {
        handleOpenAlert("Pallet ubicado correctamente", "success");
        setTimeout(() => {
            navigate(-2);
        }, 1000)
    }
    const locatePallet = async () => {

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const id_empresa = Connected.userInfo.n_id_empresa;
            const id_deposito = deposit;
            const id_zona = zone;
            const id_pasillo = idHall;
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

            const response = await fetch(`${Connected.currentURL}api/v1/deposito/ubicar_pallet_en_posicion/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            data.success && locate();
            console.log(data);

        }
    };

    const checkLocation = async (location) => {

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${location}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.access_token}`
                },
            })
            const data = await res.json();
            if (data.status === "Esta posicion se encuentra vacia") {

                if (location === ub) {
                    locatePallet();
                } else {
                    handleOpenAlert("La ubicación no coincide", "warning")
                    handleOpenDialog();
                }

            } else {
                handleOpenAlert("Ubicación no disponible", "error");
            }
            console.log(data);
        }
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [alert, setAlert] = useState("");
    const state = {
        vertical: 'top',
        horizontal: 'center',
    };
    const { vertical, horizontal } = state;

    const handleOpenDialog = () => {
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
                        setError(false);
                        if (e.target.value.length === 12) {
                            checkLocation(e.target.value);
                        } else {
                            return null;
                        }
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

                <Typography variant='h1' className='orders-header'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4' className='add-page-card-header'>{location.state.c_tipo_contenido}{location.state.c_numero} <span>/ Ubicación</span></Typography>
                    <hr className='separator' />

                    <PalletDetails 
                        hall={hall}
                        col={col}
                        row={row}
                    />

                    <Typography variant='h5' className='step-three add-page-label'>Ingrese la ubicación para confirmar</Typography>

                    <FormControl variant="outlined" size='small' fullWidth>
                        <InputLabel htmlFor="component-outlined">Ubicación</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Ubicación"
                            value={value}
                            error={error}
                            autoFocus
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {
                                value === "" ?
                                     "" 
                                : error ?
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
                </CardContent>
            </Card>

            <Dialog open={openDialog} onClose={handleCloseDialog}>

                <DialogTitle>La ubicación no coincide</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Estás ubicando el pallet en una ubicación distinta a la recomendada, estás seguro?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button
                        disabled={disabled}
                        className='add-page-button' 
                        onClick={() => {

                            const newHall = parseInt(value.substr(6,2));
                            const newCol = parseInt(value.substr(8,2));
                            const newRow = parseInt(value.substr(10,2));

                            setHall(newHall);
                            setCol(newCol);
                            setRow(newRow);

                            locatePallet();

                            handleCloseDialog();
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant="outlined" 
                        className='add-page-button' 
                        onClick={() => {
                            handleCloseDialog();
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert 
                    onClose={handleCloseAlert} 
                    severity={alertType} 
                    sx={{ width: '100%' }}
                >
                    {alert}
                </Alert>
            </Snackbar>
            
        </>
    );
}

export default LocatePageStep3;
