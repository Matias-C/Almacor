import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { PalletMask } from '../../components/masked-inputs/PalletMask';

import ContextConnected from '../../context/ContextConnected';

import "./LocatePage.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LocatePageStep1() {

    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorAlert, setErrorAlert] = useState("");
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setError(false);
                if (e.target.value.length === 10) {
                    setValue(e.target.value);
                    checkPallet(e.target.value);
                } else {
                    return null;
                }
            } else {
                setValidLength(false);
                setError(true);
            }
        } else {
            setValidPallet(false);
            setError(true);
        };
    };

    const checkPallet = async (url) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=${url}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
                },
            });
            const data = await res.json();
            data.error && handleOpenAlert("Este pallet no existe");
            data.status === "El Pallet ingresado no se encuentra en ninguna ubicacion" ? navigate(url, {state: url}) :
            data.status === "El Pallet ingresado se encuentra en una ubicacion" && handleOpenAlert("Este pallet ya fue ubicado");
            console.log(data, url);
            }
    };

    const [openAlert, setOpenAlert] = useState(false);
    const state = {
        vertical: 'top',
        horizontal: 'center',
    };
    const { vertical, horizontal } = state;

    const handleOpenAlert = (error) => {
        setErrorAlert(error)
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkPallet(value);
        }
    }

    return(

        <>
            <div className='add-page-header'>

                <Typography variant='h1'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ingrese el código del pallet</Typography>
                    <hr className='separator' />

                    <FormControl error={value === "" ? false : error} size="small" fullWidth className="add-page-input">
                        <InputLabel>Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={value}
                            onChange={handleChange}
                            autoFocus
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {
                                value === "" ?
                                    "" 
                                : error ? 
                                    !validPallet ? 
                                        "El código no es valido" 
                                    : !validPalletLength ? 
                                        "El código es demasiado corto" 
                                    : "" 
                                : ""
                            }
                        </FormHelperText>
                    </FormControl>

                </CardContent>
            </Card>

            <Snackbar 
                open={openAlert} 
                autoHideDuration={4000} 
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert 
                    onClose={handleCloseAlert} 
                    severity="error" 
                    sx={{ width: '100%' }}
                >
                    {errorAlert}
                </Alert>
            </Snackbar>
            
        </>
        
    );
}

export default LocatePageStep1;