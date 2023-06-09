import React, { useState, useContext } from "react";

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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SectionPage from "../../components/section_page/SectionPage";
import { LocationMask } from "../../components/masked-inputs/LocationMask";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import useDialog from "../../hooks/useDialog";
import useAlert from "../../hooks/useAlert";

import ContextConnected from "../../context/ContextConnected";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RemovePage() {
    const Connected = useContext(ContextConnected);

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

    const [value, setValue] = useState("");
    const [numero, setNumero] = useState("");

    const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

    const {
        openAlert,
        alertType,
        alertText,
        vertical,
        horizontal,
        handleOpenAlert,
        handleCloseAlert,
    } = useAlert();

    const handleChange = (e) => {
        const newInputValue = e.target.value;
        setValue(newInputValue);

        if (
            newInputValue.substr(0, 2) === "PL" ||
            newInputValue.substr(0, 2) === "UB"
        ) {
            if (newInputValue.substr(0, 2) === "PL") {
                setType("PL");

                if (newInputValue.length > 9) {
                    setError(false);
                    setDisabled(false);

                    if (newInputValue.length > 10) {
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
            } else if (newInputValue.substr(0, 2) === "UB") {
                setType("UB");

                if (newInputValue.length > 11) {
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

    const removePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            var formdata = new FormData();

            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=${value}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                    body: formdata,
                },
            );
            const data = await response.json();
            if (data.succes) {
                handleOpenAlert("Pallet removido correctamente", "success");
                setValue("");
            }
        }
    };

    const removeLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            var formdata = new FormData();

            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=PL${numero}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                    body: formdata,
                },
            );
            const data = await response.json();
            if (data.succes) {
                handleOpenAlert(
                    "Ubicación desocupada correctamente",
                    "success",
                );
                setValue("");
            }
        }
    };

    const getPallet = async (e) => {
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
                "El Pallet ingresado no se encuentra en ninguna ubicacion"
            ) {
                handleOpenAlert("Este pallet no se encuentra ubicado", "error");
                setValue("");
            } else if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                handleOpenDialog();
            }
        }
    };

    const locationData = (data) => {
        setNumero(data);
        handleOpenDialog();
    };

    const getLocation = async (e) => {
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
            data.error && handleOpenAlert("Esta ubicación no existe", "error");
            data.status === "Esta posicion se encuentra vacia" &&
                handleOpenAlert("Esta ubicación se encuentra vacía", "error");
            data[0].numero !== null && locationData(data[0].numero);
        }
    };

    return (
        <>
            <SectionPage sectionHeader="Remover">
                <CardContent>
                    <Typography variant="h4">Ingrese el código</Typography>
                    <hr className="separator" />

                    <FormControl
                        size="small"
                        error={value === "" ? false : error}
                        fullWidth
                        className="remove-page-input"
                    >
                        <InputLabel htmlFor="pallet-code">Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={value}
                            onChange={handleChange}
                            autoFocus
                            inputComponent={
                                type
                                    ? type === "PL"
                                        ? PalletMask
                                        : LocationMask
                                    : PalletMask
                            }
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
                                ? getPallet(e)
                                : type === "UB" && getLocation(e);
                        }}
                    >
                        Remover
                    </Button>
                </CardActions>
            </SectionPage>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Remover</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Estás por{" "}
                        {type === "PL"
                            ? "remover un pallet"
                            : type === "UB" && "desocupar una ubicación"}
                        , estás seguro?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        disabled={disabled}
                        className="add-page-button"
                        onClick={(e) => {
                            type === "PL"
                                ? removePallet(e)
                                : type === "UB" && removeLocation(e);
                            handleCloseDialog();
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button
                        variant="contained"
                        autoFocus
                        disableElevation
                        className="add-page-button"
                        onClick={() => {
                            handleCloseDialog();
                        }}
                    >
                        Cancelar
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
                    {alertText}
                </Alert>
            </Snackbar>
        </>
    );
}

export default RemovePage;
