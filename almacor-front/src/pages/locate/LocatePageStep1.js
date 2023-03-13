import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "./LocatePage.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const PalletMask = React.forwardRef(function PalletMask(props, ref) {

    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##00000000"
            definitions={{
                '#': /[A-Z]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { value } })}
            overwrite
        />
    );
});
  
PalletMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function LocatePageStep1() {

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorAlert, setErrorAlert] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setDisabled(false);
                setError(false)
            } else {
                setValidLength(false);
                setDisabled(true);
                setError(true);
            }
        } else {
            setValidPallet(false)
            setDisabled(true);
            setError(true);
        };

    };

    const checkPallet = async () => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/?numero=${value}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
                },
            });
            const data = await res.json();
            data.error && handleOpenAlert("Este pallet no existe");
            data.status === "El Pallet ingresado no se encuentra en ninguna ubicacion" ? navigate(value, {state: value}) : 
            data.status === "El Pallet ingresado se encuentra en una ubicacion" && handleOpenAlert("Este pallet ya fue ubicado");
            console.log(data);
            }
    };

    const [openAlert, setOpenAlert] = useState(false);

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
        checkPallet();
          console.log('do validate');
        }
    }

    return(

        <>
            <div className='add-page-header'>

                <Typography variant='h3'>Ubicar Pallet</Typography>

            </div>

            <Card variant="outlined" className='add-page-card'>
                <CardContent>

                    <Typography variant='h4'>Ingrese el código del pallet</Typography>
                    <hr className='separator' />

                    <FormControl variant="standard" className="add-page-input">
                        <InputLabel htmlFor="pallet-code">Código</InputLabel>
                        <Input
                            id="pallet-code"
                            value={value}
                            error={error}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {
                                error ? 
                                    !validPallet ? "El código no es valido" : 
                                        !validPalletLength ? "El código es demasiado corto" 
                                    : "" 
                                : ""
                            }
                        </FormHelperText>
                    </FormControl>

                </CardContent>
                <CardActions>

                    <Button
                        disabled={disabled}
                        variant="contained" 
                        size="medium"
                        disableElevation
                        className='add-page-button' 
                        onClick={() => {
                            checkPallet()
                        }}
                    >
                        Siguiente
                    </Button>
                    
                </CardActions>
            </Card>

            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {errorAlert}
                </Alert>
            </Snackbar>
            
        </>
        
    );
}

export default LocatePageStep1;