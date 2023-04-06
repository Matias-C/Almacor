import React, { useState, useContext, useRef } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { PalletMask } from '../../components/masked-inputs/PalletMask';
import { LocationMask } from '../../components/masked-inputs/LocationMask';

import ContextConnected from '../../context/ContextConnected';

import "./Inventory.css"

const UseFocus = () => {
	const htmlElRef = useRef(null)
	const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

	return [ htmlElRef,  setFocus ] 
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InventoryForm(props) {

    const Connected = useContext(ContextConnected);

    const [inputFocus, setInputFocus] = UseFocus();

    const [error, setError] = useState(false);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidPalletLength] = useState(false);

    const [pallet, setPallet] = useState("");

    const handleChangePallet = (e) => {
        setPallet(e.target.value);
        
        if (e.target.value.substr(0,2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidPalletLength(true);
                setError(false);
                if (e.target.value.length === 10) {
                    checkPallet(e.target.value);
                } else {
                    return null;
                }
            } else {
                setValidPalletLength(false);
                setError(true);
            }
        } else {
            setValidPallet(false);
            setError(true);
        };
    };

    const [validLocation, setValidLocation] = useState(false);
    const [validLocationLength, setValidLocationLength] = useState(false);

    const [location, setLocation] = useState("");
    
    const handleChangeLocation = (e) => {
        setLocation(e.target.value);
        
        if (e.target.value.substr(0,2) === "UB") {
            setValidLocation(true);
            if (e.target.value.length > 11) {
                setValidLocationLength(true);
                setError(false);
                if (e.target.value.length === 12) {
                    checkLocation(e.target.value);
                } else {
                    return null;
                }
            } else {
                setValidLocationLength(false);
                setError(true);
            };
        } else {
            setValidLocation(false);
            setError(true);
        };
    };

    const checkPallet = async (pallet) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/partidas/?numero=${pallet}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
                },
            });
            const data = await res.json();
            data.error && handleOpenAlert("Este pallet no existe", "error");
            if (data.status === "El Pallet ingresado no se encuentra en ninguna ubicacion") {
                handleOpenAlert("Pallet disponible", "success");
                setInputFocus();
            }
            data.status === "El Pallet ingresado se encuentra en una ubicacion" && handleOpenAlert("Este pallet ya fue ubicado", "error");
            console.log(data);
            }
    };

    const checkLocation = async (location) => {

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            
            const res = await fetch(`${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${location}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.access_token}`
                },
            })
            const data = await res.json();
            if (data.status === "Esta posicion se encuentra vacia") {

                handleOpenAlert("Ubicación disponible", "success");
                addIncidence(location);

            } else {
                handleOpenAlert("Ubicación no disponible", "error");
            }
            console.log(data, location);
        }
    };

    const addIncidence = async (location) => {

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {

            const n_id_empresa = Connected.userInfo.n_id_empresa;
            const n_id_inventario = props.inventoryId;
            const ubicacion = location;
            const numero = pallet;

            var formdata = new FormData();
            formdata.append("n_id_empresa", n_id_empresa);
            formdata.append("n_id_inventario", n_id_inventario);
            formdata.append("ubicacion", ubicacion);
            formdata.append("numero", numero);

            const response = await fetch(`${Connected.currentURL}api/v1/deposito/inventarios_reales/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                },
                body: formdata
            })
            const data = await response.json();
            console.log(data, ubicacion, numero);

        }
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [alert, setAlert] = useState("");
    const state = {
        vertical: 'top',
        horizontal: 'center',
    };
    const { vertical, horizontal } = state;

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkPallet(pallet);
        }
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12} lg={12}>

                    <FormControl error={pallet === "" ? false : error} size="small" margin="dense" className="inventory-form-input">
                        <InputLabel htmlFor="component-outlined">Pallet</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Pallet"
                            value={pallet}
                            onChange={handleChangePallet}
                            autoFocus
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {
                                pallet === "" ?
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

                </Grid>

                <Grid xs={12} sm={12} md={12} lg={12}>
                    <FormControl error={location === "" ? false : error} size="small" className="inventory-form-input">
                        <InputLabel htmlFor="component-outlined">Ubicación</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Ubicación"
                            value={location}
                            onChange={handleChangeLocation}
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            inputComponent={LocationMask}
                            inputRef={inputFocus}
                        />
                        <FormHelperText>
                            {
                                location === "" ?
                                    "" 
                                : error ? 
                                    !validLocation ? 
                                        "El código no es valido" 
                                    : !validLocationLength ? 
                                        "El código es demasiado corto" 
                                    : "" 
                                : ""
                            }
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>

            <Snackbar 
                open={openAlert}
                autoHideDuration={1500}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert 
                    onClose={handleCloseAlert} 
                    severity={alertType} 
                    sx={{ width: '100%' }}
                >
                    {alert}
                </Alert>
            </Snackbar>
        </>
    );
}

export default InventoryForm;