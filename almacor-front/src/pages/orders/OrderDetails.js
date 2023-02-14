import Grid from '@mui/material/Grid';

import OrderCard from '../../components/orders/OrderCard';

import "./OrderDetails.css"

function OrderDetails() {
    return(

        <div className="order-details">

            <div className="order-details-header">
                <div className="order-details-number">

                    <h1>0000</h1>

                </div>
                
                <h1>Local 1</h1>
            </div>

            <Grid container spacing={2} className="orders-details-grid">

                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />

            </Grid>

        </div>

    );
}

export default OrderDetails;