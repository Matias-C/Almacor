import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Divider from '@mui/material/Divider';

import "./OrderCard.css"

function OrderCard(props) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    const sendRemoved = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const b_quitado = "true";

            var formdata = new FormData();
            formdata.append("b_quitado", b_quitado);

            await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/?id_numero_partida=${props.idPartida}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })

            const response = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/?numero=PL${props.orderConteiner}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
            })

            const data = await response.json();
            console.log(data);

        }
    };

    return(

        <Grid xs={12} sm={6} md={3}>

            <Card variant='outlined' className={props.orderDespacho ? "despachado" : "no-despachado"}>

                <CardContent>

                    <Typography variant='h4' className='order-card-header'>Contenedor: <span className='number'>{props.orderConteiner}</span></Typography>
                    <hr className='separator' />

                    <div className='order-card-table-cont'>
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Remito</Typography>
                            <Typography variant='body' className='number'>{props.orderRemito}</Typography>

                        </div>
                        <Divider />
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Pasillo</Typography>
                            <Typography variant='body' className='number'>{props.orderHall}</Typography>

                        </div>
                        <Divider />
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Columna</Typography>
                            <Typography variant='body' className='number'>{props.orderCol}</Typography>

                        </div>
                        <Divider />
                        <div className='order-card-table-item'>

                            <Typography variant='body'>Nivel</Typography>
                            <Typography variant='body' className='number'>{props.orderRow}</Typography>

                        </div>

                    </div>

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
                    {"Estás seguro?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        No podrá revertir esta acción.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className='order-card-button'
                        onClick={(e) => {
                            sendRemoved(e);
                            handleClose()
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button variant='outlined'  onClick={handleClose} autoFocus className='order-card-button'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>


        </Grid>

    );
}

export default OrderCard;