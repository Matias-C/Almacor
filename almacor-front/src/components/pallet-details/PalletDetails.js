import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

import "./PalletDetails.css";

function PalletDetails(props) {
    return(
        <>
            <div className="pallet-details-cont">

                <Grid container spacing={1} className="pallet-details-grid">

                    {props.pallet &&

                        <Grid xs={12} sm={12} md={12}>
                            <div className='pallet-details-table header'>
                                <Typography variant="h3">PL{props.pallet}</Typography>
                            </div>
                        </Grid>
                    
                    }

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table header'>
                            <Typography variant='h5'>Pasillo</Typography>
                        </div>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table header'>
                            <Typography variant='h5'>Columna</Typography>
                        </div>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table header'>
                            <Typography variant='h5'>Nivel</Typography>
                        </div>
                    </Grid>

                </Grid>

                <Grid container spacing={1} className="pallet-details-grid">

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table item'>
                        <Typography variant='h1' className='number'>{props.hall ? props.hall : "-"}</Typography>
                        </div>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table item'>
                        <Typography variant='h1' className='number'>{props.col ? props.col : "-"}</Typography>
                        </div>
                    </Grid>

                    <Grid xs={4} sm={4} md={4}>
                        <div className='pallet-details-table item'>
                        <Typography variant='h1' className='number'>{props.row ? props.row : "-"}</Typography>
                        </div>
                    </Grid>

                </Grid>

            </div>
        </>
    );
}

export default PalletDetails