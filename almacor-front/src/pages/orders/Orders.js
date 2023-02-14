import Grid from '@mui/material/Grid';

import OrderButton from "../../components/orders/OrderButton";

import "./Orders.css"

function Orders() {
    return(

        <div className="orders">

            <h1 className='orders-header'>Ordenes Activas</h1>

            <Grid container spacing={2} className="orders-grid">

                <OrderButton />
                <OrderButton />
                <OrderButton />
                <OrderButton />
                <OrderButton />
                <OrderButton />
                <OrderButton />
                
            </Grid> 

        </div>

    );
}

export default Orders;