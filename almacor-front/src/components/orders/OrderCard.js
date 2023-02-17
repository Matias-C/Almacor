import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./OrderCard.css"
import { CardActions } from '@mui/material';

function OrderCard(props) {
    return(

        <Grid xs={12} sm={6} md={3}>

            <Card variant='outlined' className="order-card-cont">

                <CardContent>

                    <Typography variant='h4' className='order-card-header'>Contenedor: <span className='number'>{props.orderConteiner}</span></Typography>
                    <hr className='separator' />

                    <div className='order-card-table-cont'>
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Pasillo</Typography>
                            <Typography variant='body' className='number'>{props.orderHall}</Typography>

                        </div>
                        <div className='order-card-table-item'>

                            <Typography variant='body' className='order-card-item'>Columna</Typography>
                            <Typography variant='body' className='number'>{props.orderCol}</Typography>

                        </div>
                        <div className='order-card-table-item'>

                            <Typography variant='body'>Fila</Typography>
                            <Typography variant='body' className='number'>{props.orderRow}</Typography>

                        </div>

                    </div>

                </CardContent>
                <CardActions>

                    <Button variant='contained' size='small' className='order-card-button' disableElevation><h2>Quitar</h2></Button>

                </CardActions>

            </Card>

        </Grid>

    );
}

export default OrderCard;