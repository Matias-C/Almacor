import Grid from '@mui/material/Grid';

import "./OrderCard.css"

function OrderCard() {
    return(

        <Grid item xs={12} sm={6} md={3}>

            <div className="order-card-cont">

                    <h2 className='order-card-header'>Partida: <span className='number'>123456</span></h2>
                    <hr className='order-card-hr' />

                <div className='order-card-table-cont'>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Deposito</p>
                        <p className='number'>00</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Zona</p>
                        <p className='number'>00</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Pasillo</p>
                        <p className='number'>00</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p className='order-card-item'>Columna</p>
                        <p className='number'>00</p>
                    </div>

                    <div className='order-card-table-item'>
                        <p>Fila</p>
                        <p className='number'>00</p>
                    </div>

                </div>

                <button className='order-card-button'><h2>Quitar</h2></button>

            </div>

        </Grid>

    );
}

export default OrderCard;