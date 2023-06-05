import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Typography from "@mui/material/Typography";

import "./OrderCard.css";

function OrderCardPalletDisplay(props) {
    return (
        <div className="pallet-display-cont">
            <Grid container spacing={1} className="order-card-grid">
                <Grid xs={4} sm={4} md={4} lg={4}>
                    <div className="order-card-header">
                        <Typography variant="h5">{props.pallet}</Typography>
                    </div>
                </Grid>

                <Grid xs={4} sm={4} md={4} lg={4}>
                    <div className="order-card-header">
                        <Typography variant="h5">{props.remito}</Typography>
                    </div>
                </Grid>

                <Grid xs={4} sm={4} md={4} lg={4}>
                    <div className="order-card-header">
                        <Typography variant="h5">{props.originDeposit}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrderCardPalletDisplay;
