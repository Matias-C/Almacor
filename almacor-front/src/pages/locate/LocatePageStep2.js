import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import "./LocatePage.css"

function LocatePageStep2() {

    const navigate = useNavigate();
    const location = useLocation();

    const [pallet, setPallet] = React.useState(null)

    React.useEffect(() => {
        const getPallet = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/?numero=${location.state}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setPallet(data.data[0]);
            console.log(data.data);
          }
        };
        getPallet();
    }, []);

    if (pallet === null) {
        return null;
    } else {

        return(

            <>
            
                <div className='add-page-header'>
    
                    <Typography variant='h2' className='orders-header'>Ubicar Pallet</Typography>
    
                </div>
    
                <Card variant="outlined" className='add-page-card'>
                    <CardContent>

                        <Typography variant='h4'>{pallet.c_tipo_contenido}{pallet.c_numero}: Detalles</Typography>
                        <hr className='separator' />

                        <div className='add-page-inputs-cont'>
                            <Typography variant='h5' className='add-page-label'>Peso</Typography>
                            <TextField
                                id="pallet-weight"
                                select
                                variant="standard"
                                defaultValue={pallet.n_tipopeso}
                                className='add-page-input'
                                >
                                    <MenuItem key="1" value="1">
                                        1 - Liviano
                                    </MenuItem>
                                    <MenuItem key="2" value="2">
                                        2 - Intermedio
                                    </MenuItem>
                                    <MenuItem key="3" value="3">
                                        3 - Pesado
                                    </MenuItem>
                            </TextField>

                            <Typography variant='h5' className='add-page-label'>Altura</Typography>
                            <TextField
                                id="pallet-height"
                                select
                                variant="standard"
                                defaultValue={pallet.n_tipoaltura}
                                className='add-page-input'
                                >
                                    <MenuItem key="1" value="1">
                                        1 - Bajo
                                    </MenuItem>
                                    <MenuItem key="2" value="2">
                                        2 - Intermedio
                                    </MenuItem>
                                    <MenuItem key="3" value="3">
                                        3 - Alto
                                    </MenuItem>
                            </TextField>

                            <Typography variant='h5' className='add-page-label'>Nivel de Rotación</Typography>
                            <TextField
                                id="pallet-level-rotation"
                                select
                                variant="standard"
                                defaultValue={pallet.n_nivelrotacion}
                                className='add-page-input'
                                >
                                    <MenuItem key="1" value="1">
                                        1
                                    </MenuItem>
                                    <MenuItem key="2" value="2">
                                        2
                                    </MenuItem>
                                    <MenuItem key="3" value="3">
                                        3
                                    </MenuItem>
                            </TextField>

                        </div>
                    </CardContent>
                    <CardActions>
    
                        <Button
                            variant="contained" 
                            size="medium"
                            className='add-page-button' 
                            disableElevation
                            onClick={() => { navigate("ubicacion", {state: pallet}); }}
                        >
                            Siguiente
                        </Button>
                        
                    </CardActions>
                </Card>
                
            </>
            
    
        );

    };

}

export default LocatePageStep2;