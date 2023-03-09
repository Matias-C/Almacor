import React, { useState } from 'react';

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

import "./RemovePage.css"

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
                '#': /[a-z A-Z]/,
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

function RemovePage() {

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState("");
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL" || e.target.value.substr(0,2) === "UB") {
            if (e.target.value.substr(0,2) === "PL") {
                setType("PL");
            } else if (e.target.value.substr(0,2) === "UB") {
                setType("UB");
            }
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setError(false);
                setDisabled(false);
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

        console.log(type);

    };

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [alert, setAlert] = useState("");

    const handleOpenAlert = (alert, type) => {
        setAlertType(type);
        setAlert(alert);
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const removePallet = async (e) => {
        e.preventDefault();
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            var formdata = new FormData();

            const response = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/partidas/?numero=${value}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            data.succes && handleOpenAlert("Pallet removido correctamente", "success");
            console.log(data);
        }
    };

    const getPallet = async (e) => {
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
            data.error && handleOpenAlert("Este pallet no existe", "error");
            data.status === "El Pallet ingresado no se encuentra en ninguna ubicacion" && handleOpenAlert("Este pallet no fue ubicado", "error");
            data.status === "El Pallet ingresado se encuentra en una ubicacion" && removePallet(e);
            console.log(data);
        }
    };

    return(

        <>
            <div className='remove-page-header'>

                <Typography variant='h3'>Remover Pallet</Typography>

            </div>

            <Card variant="outlined" className='remove-page-card'>
                <CardContent>

                <Typography variant='h4'>Ingrese el código del pallet</Typography>
                    <hr className='separator' />

                    <FormControl variant="standard" className="remove-page-input">
                        <InputLabel htmlFor="pallet-code">Código</InputLabel>
                        <Input
                            id="pallet-code"
                            value={value}
                            error={error}
                            onChange={handleChange}
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
                        onClick={(e) => {
                                getPallet(e);
                            }}
                    >
                        Remover
                    </Button>
                    
                </CardActions>
            </Card>

            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>
        </>
        

    );
}

export default RemovePage;