import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from '@mui/material';

import "./ZoneButton.css"

function ZoneButton(props) {

    const navigate = useNavigate();
    
    return(

        <Grid xs={4} sm={4} md={3} lg={2}>

            <Paper elevation={3} className="zone-button-cont" onClick={() => { navigate(`deposito=${props.zoneName}/zonas`, {state: props.zone}); }}>
                <Typography variant="h3" color="primary">{props.zoneName}</Typography>
            </Paper>

        </Grid>

    );
}

export default ZoneButton;