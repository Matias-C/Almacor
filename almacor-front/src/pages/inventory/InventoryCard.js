import React, { useState, useContext } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PalletDetails from '../../components/pallet-details/PalletDetails';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ContextConnected from '../../context/ContextConnected';

import "./Inventory.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InventoryCard(props) {

    const Connected = useContext(ContextConnected);

    const [open, setOpen] = useState(false);

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

    const removeIncidence = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            var formdata = new FormData();

            const response = await fetch(`${Connected.currentURL}api/v1/deposito/inventarios_reales/?id=${props.itemId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            if (data.succes) {
                handleOpenAlert("Quitado correctamente", "success");
                refreshPage();
            }
            console.log(data);
        }
    };
    
    return(

        <>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Card variant='outlined'>

                    <CardContent>

                        <PalletDetails
                            pallet={props.itemPL}
                            hall={props.itemHall}
                            col={props.itemCol}
                            row={props.itemRow}
                        />

                    </CardContent>

                    <CardActions>
                        <Button 
                            variant='contained' 
                            size='medium' 
                            className='order-card-button' 
                            disableElevation
                            onClick={handleOpen}
                        >
                            Quitar
                        </Button>
                    </CardActions>

                </Card>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Quitar"}
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Estás por quitar una incidencia, ¿Estás seguro?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button 
                        variant='outlined' 
                        disableElevation 
                        className='order-card-button' 
                        onClick={(e) => {
                            removeIncidence(e);
                            handleClose();
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant='contained' 
                        autoFocus 
                        disableElevation 
                        className='order-card-button' 
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar 
                open={openAlert}
                autoHideDuration={2000}
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

export default InventoryCard;