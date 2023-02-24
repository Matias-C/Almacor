import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import "./LocatePage.css"

function LocatePageStep2() {

    const navigate = useNavigate();
    const location = useLocation();

    const [pallet, setPallet] = useState(null);
    
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [rotation, setRotation] = useState("");

    const handleWeight = (event) => {
        setWeight(event.target.value);
    };

    const handleHeight = (event) => {
        setHeight(event.target.value);
    };

    const handleRotation = (event) => {
        setRotation(event.target.value);
    };

    useEffect(() => {
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
            setWeight(data.data[0].n_tipopeso);
            setHeight(data.data[0].n_tipoaltura);
            setRotation(data.data[0].n_nivelrotacion);
            console.log(data.data);
          }
        };
        getPallet();
    }, []);

    const changePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const n_id_partida = pallet.n_id_partida;

            const n_tipopeso = weight;
            const n_tipoaltura = height;
            const n_nivelrotacion = rotation;

            var formdata = new FormData();
            formdata.append("n_tipopeso", n_tipopeso);
            formdata.append("n_tipoaltura", n_tipoaltura);
            formdata.append("n_nivelrotacion", n_nivelrotacion);

            await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/${n_id_partida}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })

        }
    };

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

                        <Typography variant='h4'>{pallet.c_tipo_contenido}{pallet.c_numero}</Typography>
                        <hr className='separator' />

                        <div className='add-page-inputs-cont'>

                            <Typography variant='h5' className='add-page-label'>Peso (Se puede cambiar)</Typography>
                        
                            <FormControl variant="standard" className='add-page-input'>
                                <Select
                                    id="pallet-weight"
                                    value={weight}
                                    onChange={handleWeight}
                                >
                                    <MenuItem value={1}>1 - Liviano</MenuItem>
                                    <MenuItem value={2}>2 - Intermedio</MenuItem>
                                    <MenuItem value={3}>3 - Pesado</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant='h5' className='add-page-label'>Altura (Se puede cambiar)</Typography>

                            <FormControl variant="standard" className='add-page-input'>
                                <Select
                                    id="pallet-height"
                                    value={height}
                                    onChange={handleHeight}
                                >
                                    <MenuItem value={1}>1 - Bajo</MenuItem>
                                    <MenuItem value={2}>2 - Intermedio</MenuItem>
                                    <MenuItem value={3}>3 - Intermedio</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant='h5' className='add-page-label'>Nivel de Rotación (Se puede cambiar)</Typography>

                            <FormControl variant="standard" className='add-page-input'>
                                <Select
                                    id="pallet-rotation"
                                    value={rotation}
                                    onChange={handleRotation}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                    </CardContent>
                    <CardActions>
    
                        <Button
                            variant="contained" 
                            size="medium"
                            className='add-page-button' 
                            disableElevation
                            onClick={(e) => {
                                changePallet(e);
                                navigate("ubicacion", {state: pallet});
                            }}
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