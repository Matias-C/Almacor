import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import "./OrderButton.css"

function OrderButton(props) {

    const navigate = useNavigate();

    return(

        <Grid item xs={12} sm={6} md={3}>

            <button className="order-button-cont" onClick={() => { navigate(`orden=${props.orderNumber}`, {state: props.order}); }}>

                <div className="order-number"><h2>{props.orderNumber}</h2></div>
                <div className="order-store"><h2>{props.orderStore}</h2></div>

            </button>

        </Grid>

    );
}

export default OrderButton;