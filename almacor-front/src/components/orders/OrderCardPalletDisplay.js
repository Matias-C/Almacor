import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Typography from "@mui/material/Typography";

import "./OrderCard.css";

function OrderCardPalletDisplay(props) {
    return (
        <div className="pallet-display-cont">
            <Grid container spacing={1} className="order-card-grid">
                <Grid xs={6} sm={6} md={6} lg={6}>
                    <div className="pallet-display-item">
                        <Typography variant="h5">PL{props.pallet}</Typography>
                    </div>
                </Grid>

                <Grid xs={6} sm={6} md={6} lg={6}>
                    <div className="pallet-display-item">
                        <Typography variant="h5">{props.remito}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrderCardPalletDisplay;
