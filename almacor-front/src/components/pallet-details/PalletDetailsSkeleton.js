import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

import Skeleton from '@mui/material/Skeleton';

import "./PalletDetails.css";

function PalletDetailsSkeleton(props) {
    return(
        <>
            <div className="pallet-details-cont">

                <Grid container spacing={1} className="pallet-details-grid">

                    {
                        props.pallet &&

                            <Grid xs={12} sm={12} md={12}>
                                <Skeleton variant="rounded" width="100%" animation="wave">
                                    <div className='pallet-details-table header'>
                                        <Typography variant="h3">-</Typography>
                                    </div>
                                </Skeleton>
                            </Grid>
                    
                    }

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table header'>
                                <Typography variant='h5'>-</Typography>
                            </div>
                        </Skeleton>
                        
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table header'>
                                <Typography variant='h5'>-</Typography>
                            </div>
                        </Skeleton>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table header'>
                                <Typography variant='h5'>-</Typography>
                            </div>
                        </Skeleton>
                    </Grid>

                </Grid>

                <Grid container spacing={1} className="pallet-details-grid">

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table item'>
                                <Typography variant='h1' className='number'>-</Typography>
                            </div>
                        </Skeleton>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table item'>
                                <Typography variant='h1' className='number'>-</Typography>
                            </div>
                        </Skeleton>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <Skeleton variant="rounded" width="100%" animation="wave">
                            <div className='pallet-details-table item'>
                                <Typography variant='h1' className='number'>-</Typography>
                            </div>
                        </Skeleton>
                    </Grid>

                </Grid>

            </div>
        </>
    );
}

export default PalletDetailsSkeleton;