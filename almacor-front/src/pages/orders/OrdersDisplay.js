import Grid from '@mui/material/Grid';

import OrderButton from "../../components/orders/OrderButton";

import "./OrdersDisplay.css"

function OrdersDisplay() {
    return(

        <div className="orders">

            <h1 className='orders-header'>Ordenes Activas</h1>

            <Grid container spacing={2} className="orders-grid">

                <OrderButton 
                    orderNumber="0123"
                    orderStore="Local 0123"
                />
                
            </Grid> 

        </div>

    );
}

export default OrdersDisplay;