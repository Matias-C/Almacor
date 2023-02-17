import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./AddPage.css"
import { CardActions } from '@mui/material';

function AddPage() {
    return(

        <>
            <div className='add-page-header'>

                <Typography variant='h2' className='orders-header'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ingrese el código del pallet</Typography>

                    <hr className='separator' />

                    <TextField className='add-page-input' label="Código" variant="standard" />

                </CardContent>
                <CardActions>

                    <Button size="small" variant="contained" className='add-page-button' disableElevation><h2>Añadir</h2></Button>
                    
                </CardActions>
            </Card>
        </>
        

    );
}

export default AddPage;