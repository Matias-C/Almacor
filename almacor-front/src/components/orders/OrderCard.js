import Grid from '@mui/material/Unstable_Grid2';

import "./OrderCard.css"

function OrderCard(props) {
    return(

        <Grid xs={12} sm={6} md={3}>

            <div className="order-card-cont">

                    <h2 className='order-card-header'>Partida: <span className='number'>{props.orderDeparture}</span></h2>
                    <hr className='separator' />

                <div className='order-card-table-cont'>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Deposito</p>
                        <p className='number'>{props.orderDeposit}</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Zona</p>
                        <p className='number'>{props.orderZone}</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Pasillo</p>
                        <p className='number'>{props.orderHall}</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Columna</p>
                        <p className='number'>{props.orderCol}</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p>Fila</p>
                        <p className='number'>{props.orderRow}</p>
                    </div>

                </div>

                <button className='order-card-button'><h2>Quitar</h2></button>

            </div>

        </Grid>

    );
}

export default OrderCard;