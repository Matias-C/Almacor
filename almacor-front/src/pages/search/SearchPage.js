import React, { useState, useContext } from "react";

import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SectionPage from "../../components/section_page/SectionPage";
import PalletDetails from "../../components/pallet_details/PalletDetails";

import ContextConnected from "../../context/ContextConnected";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InputMask = React.forwardRef(function InputMask(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##0000000000"
            definitions={{
                "#": /[A-Z]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { value } })}
            overwrite
        />
    );
});

InputMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function SearchPalletPage() {
    const Connected = useContext(ContextConnected);

    const [pallet, setPallet] = useState([]);

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);

        if (
            e.target.value.substr(0, 2) === "PL" ||
            e.target.value.substr(0, 2) === "UB"
        ) {
            if (e.target.value.substr(0, 2) === "PL") {
                setType("PL");

                if (e.target.value.length > 9) {
                    setError(false);
                    setDisabled(false);

                    if (e.target.value.length > 10) {
                        setMessage("El código es demasiado largo");
                        setError(true);
                        setDisabled(true);
                    } else {
                        setError(false);
                        setDisabled(false);
                    }
                } else {
                    setMessage("El código es demasiado corto");
                    setDisabled(true);
                    setError(true);
                }
            } else if (e.target.value.substr(0, 2) === "UB") {
                setType("UB");

                if (e.target.value.length > 11) {
                    setError(false);
                    setDisabled(false);
                } else {
                    setMessage("El código es demasiado corto");
                    setDisabled(true);
                    setError(true);
                }
            }
        } else {
            setMessage("El código no es válido");
            setDisabled(true);
            setError(true);
        }
    };

    const searchPallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=${value}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            const data = await res.json();
            if (data.error) {
                handleOpenAlert("Este pallet no existe", "error");
                setValue("");
            }
            if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                handleOpenAlert("Se encontró el pallet", "success");
                setPallet(data.data[0]);
                setOpenDialog(true);
            } else if (
                data.status ===
                "El Pallet ingresado no se encuentra en ninguna ubicacion"
            ) {
                handleOpenAlert("Este pallet no fue ubicado", "error");
                setValue("");
            }
        }
    };

    const searchLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${value}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            const data = await res.json();
            if (data.error) {
                handleOpenAlert("Esta ubicación no existe", "error");
                setValue("");
            } else if (data.status === "Esta posicion se encuentra vacia") {
                handleOpenAlert("Esta posición está vacía", "error");
                setValue("");
            } else if (data) {
                handleOpenAlert("Se encontró la ubicación", "success");
                setPallet(data[0]);
                setOpenDialog(true);
            }
        }
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setValue("");
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alert, setAlert] = useState("");
    const state = {
        vertical: "top",
        horizontal: "center",
    };
    const { vertical, horizontal } = state;

    const handleOpenAlert = (alert, type) => {
        setAlertType(type);
        setAlert(alert);
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <>
            <SectionPage sectionHeader="Localizar">
                <CardContent>
                    <Typography variant="h4">Ingrese el código</Typography>
                    <hr className="separator" />

                    <FormControl
                        error={value === "" ? false : error}
                        size="small"
                        fullWidth
                        className="add-page-input"
                    >
                        <InputLabel>Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={value}
                            onChange={handleChange}
                            autoFocus
                            inputComponent={InputMask}
                        />
                        <FormHelperText>
                            {value === "" ? "" : error ? message : ""}
                        </FormHelperText>
                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button
                        disabled={disabled}
                        variant="contained"
                        size="medium"
                        disableElevation
                        className="add-page-button"
                        onClick={(e) => {
                            type === "PL"
                                ? searchPallet(e)
                                : type === "UB" && searchLocation(e);
                        }}
                    >
                        Localizar
                    </Button>
                </CardActions>
            </SectionPage>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="xs"
            >
                <DialogContent className="inventory-dialog">
                    <PalletDetails
                        pallet={pallet.numero}
                        hall={pallet.c_pasillo}
                        col={pallet.n_id_columna}
                        row={pallet.n_id_fila}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        className="add-page-button"
                        onClick={() => {
                            handleCloseDialog();
                        }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openAlert}
                autoHideDuration={2200}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertType}
                    sx={{ width: "100%" }}
                >
                    {alert}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SearchPalletPage;
