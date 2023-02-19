import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CardActions } from '@mui/material';

import "./RemovePage.css"

function RemovePage() {
    return(

        <>
            <div className='add-page-header'>

                <Typography variant='h2' className='orders-header'>Remover Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ingrese el código del pallet</Typography>

                    <hr className='separator' />

                    <TextField className='add-page-input' label="Código" variant="standard" />

                </CardContent>
                <CardActions>

                    <Button size="medium" variant="contained" className='add-page-button' disableElevation>Remover</Button>
                    
                </CardActions>
            </Card>
        </>
        

    );
}

export default RemovePage;