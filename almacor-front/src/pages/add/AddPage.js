import React from 'react';
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

import "./AddPage.css"

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

function AddPage() {

    const [error, setError] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [validPallet, setValidPallet] = React.useState(false);
    const [validPalletLength, setValidLength] = React.useState(false);

    const [value, setValue] = React.useState("");
    
    const handleChange = (e) => {
        setValue(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL") {
            setValidPallet(true);
            setDisabled(false);
            setError(false)
        } else {
            setValidPallet(false)
            setError(true);
        };

    };

    const sendPallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const c_numero = value.substr(2,10);

            var formdata = new FormData();
            formdata.append("c_numero", c_numero);

            await fetch(`http://127.0.0.1:8000/api/v1/deposito/partidas/?numero=${value}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })

        }
    };

    return(

        <>
            <div className='add-page-header'>

                <Typography variant='h2' className='orders-header'>Ubicar Pallet</Typography>

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
                                inputComponent={PalletMask}
                            />
                            <FormHelperText>{error ? "Código no valido" : ""}</FormHelperText>
                    </FormControl>

                </CardContent>
                <CardActions>

                    <Button
                        disabled={disabled}
                        variant="contained" 
                        size="medium"
                        className='add-page-button' 
                        disableElevation
                        onClick={sendPallet}
                    >
                        Suiguiente
                    </Button>
                    
                </CardActions>
            </Card>
        </>
        

    );
}

export default AddPage;