import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Button } from '@mui/material';

import "./Display.css";

function DisplayButton(props) {

    const navigate = useNavigate();

    return(

        <Grid xs={12} sm={6} md={4} lg={3}>

            <Button variant='outlined' className="display-button-cont" onClick={() => { navigate(props.displayButtonURL, {state: props.object}); }}>

                <div className="display-type">{props.displayButtonType} {props.displayButtonTypeDetail}</div>
                <div className="display-detail">{props.displayButtonHeader}</div>

            </Button>

        </Grid>

    );
}

export default DisplayButton;