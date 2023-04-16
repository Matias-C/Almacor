import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

import PalletDetails from '../pallet-details/PalletDetails';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ContextConnected from '../../context/ContextConnected';

import "./OrderCard.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PalletMask = React.forwardRef(function PalletMask(props, ref) {

    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##00000000"
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

function OrderCard(props) {

    const Connected = useContext(ContextConnected);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState(false);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setError(false);
                if (e.target.value.length === 10) {
                    setValue(e.target.value);
                    sendRemoved(e.target.value)
                } else {
                    return null;
                }
            } else {
                setValidLength(false);
                setError(true);
            }
        } else {
            setValidPallet(false);
            setError(true);
        };
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [alert, setAlert] = useState("");
    const state = {
        vertical: 'top',
        horizontal: 'center',
    };
    const { vertical, horizontal } = state;

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

    const refreshPage = () => {
        window.location.reload(false);
    }

    const sendRemoved = async (pallet) => {

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            if (pallet.substr(2,8) === props.orderConteiner) {

                const b_quitado = "true";

                var formdata = new FormData();
                formdata.append("b_quitado", b_quitado);

                const result = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?id_numero_partida=${props.idPartida}`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token.access_token}`
                    },
                    body: formdata
                })

                const response = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=PL${props.orderConteiner}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token.access_token}`
                    },
                })

                const data = await response.json();
                data && refreshPage();

            } else {
                handleOpenAlert("El código no coindice", "error")
            }

        }
    };
    
    return(

        <Grid xs={12} sm={6} md={6} lg={3}>

            <Card variant='outlined' className={props.orderDespacho ? "despachado" : "no-despachado"}>

                <CardContent>

                    <Typography variant='h4' className='order-card-header'>PL{props.orderConteiner}</Typography>
                    <hr className='separator' />

                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Remito</Typography>
                            <Typography variant='body' className='number'>{props.orderRemito}</Typography>

                        </div>

                    <PalletDetails 
                        hall={props.orderHall}
                        col={props.orderCol}
                        row={props.orderRow}
                    />

                </CardContent>

                <CardActions>
                    {
                        !props.orderDespacho ? 

                            <Button 
                                variant='contained' 
                                size='medium' 
                                className='order-card-button' 
                                disableElevation
                                onClick={handleOpen}
                            >
                                Quitar
                            </Button>
                        :
                            <Button 
                                variant='outlined' 
                                size='medium' 
                                className='order-card-button despachado' 
                                disableElevation
                                disabled
                                startIcon={<CheckCircleIcon />}
                            >
                                Quitado
                            </Button>
                    }
                </CardActions>

            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {"Se necesita confirmación"}
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Ingrese el código del pallet a quitar para confirmar.
                    </DialogContentText>

                    <FormControl error={value === "" ? false : error} size="small" className="order-card-input" fullWidth>
                        <InputLabel htmlFor="component-outlined">Código</InputLabel>
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
                                    !validPallet ? 
                                        "El código no es valido" 
                                    : !validPalletLength ? 
                                        "El código es demasiado corto" 
                                    : "" 
                                : ""
                            }
                        </FormHelperText>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button variant='contained' autoFocus disableElevation className='order-card-button' onClick={handleClose}>
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

        </Grid>

    );
}

export default OrderCard;