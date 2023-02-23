import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./OrderCard.css"

function OrderCard(props) {

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
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Pasillo</Typography>
                            <Typography variant='body' className='number'>{props.orderHall}</Typography>

                        </div>
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Columna</Typography>
                            <Typography variant='body' className='number'>{props.orderCol}</Typography>

                        </div>
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Fila</Typography>
                            <Typography variant='body' className='number'>{props.orderRow}</Typography>

                        </div>
                        <div className='order-card-table-item'>

                            <Typography variant='body'>Despachado</Typography>
                            <Typography variant='body' className='number'>{props.orderDespacho ? "SI" : "NO"}</Typography>

                        </div>

                    </div>

                </CardContent>

                    {
                        !props.orderDespacho ? 

                            <CardActions>
                                <Button 
                                    variant='contained' 
                                    size='medium' 
                                    className='order-card-button' 
                                    disableElevation
                                    onClick={(e) => sendRemoved(e)}
                                >
                                    Quitar
                                </Button>
                            </CardActions>
                        :
                            null
                    }

            </Card>

        </Grid>

    );
}

export default OrderCard;