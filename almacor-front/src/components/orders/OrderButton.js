import Grid from '@mui/material/Grid';

import "./OrderButton.css"

function OrderButton() {
    return(

        <Grid item xs={12} sm={6} md={3}>

            <button className="order-button-cont">

                <div className="order-number"><h2>0000</h2></div>
                <div className="order-store"><h2>Local 0</h2></div>

            </button>

        </Grid>

    );
}

export default OrderButton;