import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import "./OrderButton.css"

function OrderButton(props) {

    const navigate = useNavigate();

    return(

        <Grid item xs={12} sm={6} md={4} lg={3}>

            <Button variant='outlined' className="order-button-cont" onClick={() => { navigate(`orden=${props.orderNumber}`, {state: props.order}); }}>

                <div className="order-number">Orden {props.orderNumber}</div>
                <div className="order-store">{props.orderStore}</div>

            </Button>

        </Grid>

    );
}

export default OrderButton;