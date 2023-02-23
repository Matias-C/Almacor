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

import "./LocatePage.css"

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
    const [disabled, setDisabled] = useState(true);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = React.useState("");
    
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
                        onClick={() => { navigate(value , {state: value}); }}
                    >
                        Siguiente
                    </Button>
                    
                </CardActions>
            </Card>
            
        </>
        
    );
}

export default LocatePageStep1;