import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";

import PalletDetailsSkeleton from "../pallet_details/PalletDetailsSkeleton";
import OrderCardPalletDisplay from "./OrderCardPalletDisplay";

import "./OrderCard.css";

function OrderCardSkeleton() {
    return (
        <Grid xs={12} sm={12} md={12} lg={6}>
            <Card variant="outlined">
                <CardContent className="card-content">
                    <Skeleton variant="rounded" animation="wave" width="100%">
                        <div className="order-card-header">
                            <Typography variant="h5">-</Typography>
                        </div>
                    </Skeleton>

                    <PalletDetailsSkeleton />

                    <Grid container spacing={1} className="order-card-grid">
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width="100%"
                            >
                                <div className="order-card-header">
                                    <Typography variant="h5">-</Typography>
                                </div>
                            </Skeleton>
                        </Grid>

                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width="100%"
                            >
                                <div className="order-card-header">
                                    <Typography variant="h5">-</Typography>
                                </div>
                            </Skeleton>
                        </Grid>

                        <Grid xs={6} sm={6} md={6} lg={6}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width="100%"
                            >
                                <div className="order-card-header">
                                    <Typography variant="h5">-</Typography>
                                </div>
                            </Skeleton>
                        </Grid>

                        <Grid xs={6} sm={6} md={6} lg={6}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width="100%"
                            >
                                <div className="order-card-header">
                                    <Typography variant="h5">-</Typography>
                                </div>
                            </Skeleton>
                        </Grid>
                    </Grid>

                    <Skeleton variant="rounded" animation="wave" width="100%">
                        <OrderCardPalletDisplay />
                    </Skeleton>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default OrderCardSkeleton;
