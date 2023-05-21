import React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PalletDetailsSkeleton from "../pallet_details/PalletDetailsSkeleton";

function InventoryCardSkeleton(props) {
    return (
        <>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <Card variant="outlined">
                    <CardContent>
                        <PalletDetailsSkeleton pallet />
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default InventoryCardSkeleton;
