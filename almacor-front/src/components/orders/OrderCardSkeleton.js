import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";

import PalletDetailsSkeleton from "../pallet_details/PalletDetailsSkeleton";

import "./OrderCard.css";

function OrderCardSkeleton(props) {
    return (
        <Grid xs={12} sm={6} md={6} lg={3}>
            <Card variant="outlined">
                <CardContent>
                    <Skeleton variant="text" width="45%" animation="wave">
                        <Typography variant="h4" className="order-card-header">
                            -
                        </Typography>
                    </Skeleton>

                    <Skeleton>
                        <hr className="separator" />
                    </Skeleton>

                    <div className="order-card-table-item">
                        <Skeleton variant="text" width="100%" animation="wave">
                            <Typography
                                variant="body"
                                className="order-card-item"
                            >
                                Remito
                            </Typography>
                        </Skeleton>
                    </div>

                    <PalletDetailsSkeleton />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default OrderCardSkeleton;
