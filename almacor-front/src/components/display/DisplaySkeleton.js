import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Skeleton from "@mui/material/Skeleton";

import "./Display.css";

function DisplaySkeleton(props) {
    return (
        <Grid xs={12} sm={12} md={6} lg={4}>
            <div className="display-button-skeleton-cont">
                <Skeleton
                    variant="rounded"
                    width={52}
                    height={42}
                    animation="wave"
                    className="display-skeleton-type"
                />
                <Skeleton
                    variant="text"
                    width="70%"
                    animation="wave"
                    sx={{ fontSize: "16px" }}
                    style={{ marginLeft: 5 }}
                />
            </div>
        </Grid>
    );
}

export default DisplaySkeleton;
