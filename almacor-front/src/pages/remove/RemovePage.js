import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ContextConnected from '../../context/ContextConnected';

import "./RemovePage.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

function RemovePage() {

    const Connected = useContext(ContextConnected);

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("")

    const [value, setValue] = useState("");
    const [numero, setNumero] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL" || e.target.value.substr(0,2) === "UB") {
            if (e.target.value.substr(0,2) === "PL") {
                setType("PL");
                
                if (e.target.value.length > 9) {
                    setError(false);
                    setDisabled(false);

                    if (e.target.value.length > 10) {
                        setMessage("El código es demasiado largo")
                        setError(true);
                        setDisabled(true);
                    } else {
                        setError(false);
                        setDisabled(false);
                    }
                    
                } else {
                    setMessage("El código es demasiado corto")
                    setDisabled(true);
                    setError(true);
                }

            } else if (e.target.value.substr(0,2) === "UB") {
                setType("UB");
                
                if (e.target.value.length > 11) {
                    setError(false);
                    setDisabled(false);
                } else {
                    setMessage("El código es demasiado corto")
                    setDisabled(true);
                    setError(true);
                }
            }

        } else {
            setMessage("El código no es válido")
            setDisabled(true);
            setError(true);
        };

        console.log(type);

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

    const removePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            var formdata = new FormData();

            const response = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=${value}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            data.succes && handleOpenAlert("Pallet removido correctamente", "success");
            console.log(data);
        }
    };

    const removeLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            var formdata = new FormData();

            const response = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=PL${numero}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            data.succes && handleOpenAlert("Ubicación desocupada correctamente", "success");
            console.log(data);
        }
    };

    const getPallet = async (e) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
          const res = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=${value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            },
            });
            const data = await res.json();
            data.error && handleOpenAlert("Este pallet no existe", "error");
            data.status === "El Pallet ingresado no se encuentra en ninguna ubicacion" && handleOpenAlert("Este pallet no se encuentra ubicado", "error");
            data.status === "El Pallet ingresado se encuentra en una ubicacion" && handleOpenDialog();
            console.log(data);
        }
    };

    const locationData = (data) => {
        setNumero(data);
        handleOpenDialog();
    }

    const getLocation = async (e) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
          const res = await fetch(`${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            },
            });
            const data = await res.json();
            data.error && handleOpenAlert("Esta ubicación no existe", "error");
            data.status === "Esta posicion se encuentra vacia" && handleOpenAlert("Esta ubicación se encuentra vacía", "error");
            data[0].numero !== null && locationData(data[0].numero);
            console.log(data);
        }
    };

    return(

        <>
            <div className='remove-page-header'>

                <Typography variant='h1'>Remover Pallet</Typography>

            </div>

            <Card variant="outlined" className='remove-page-card'>
                <CardContent>

                <Typography variant='h4'>Ingrese el código del pallet</Typography>
                    <hr className='separator' />

                    <FormControl size="small" error={value === "" ? false : error} fullWidth className="remove-page-input">
                        <InputLabel htmlFor="pallet-code">Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={value}
                            onChange={handleChange}
                            autoFocus
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {
                                value === "" ? 
                                    ""
                                : error ? 
                                    message 
                                : ""
                            }
                        </FormHelperText>
                    </FormControl>

                </CardContent>
                <CardActions>

                    <Button 
                        disabled={disabled}
                        variant="contained"
                        size="medium"
                        disableElevation
                        className='add-page-button'
                        onClick={(e) => {
                            type === "PL" ? getPallet(e) : type === "UB" && getLocation(e);
                        }}
                    >
                        Remover
                    </Button>
                    
                </CardActions>
            </Card>

            <Dialog open={openDialog} onClose={handleCloseDialog}>

                <DialogTitle>Remover</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Estás por {type === "PL" ? "remover un pallet" : type === "UB" && "desocupar una ubicación"}, estás seguro?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button
                        variant='outlined'
                        disabled={disabled}
                        className='add-page-button' 
                        onClick={(e) => {
                            type === "PL" ? removePallet(e) : type === "UB" && removeLocation(e);
                            handleCloseDialog();
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant="contained" 
                        autofocus
                        disableElevation
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

export default RemovePage;