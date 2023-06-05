import React, { useState, useContext } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PalletDetails from "../pallet_details/PalletDetails";
import { PalletMask } from "../masked-inputs/PalletMask";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ContextConnected from "../../context/ContextConnected";

import "./OrderCard.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OrderCard(props) {
    const Connected = useContext(ContextConnected);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState(false);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);

        if (e.target.value.substr(0, 2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setError(false);
                if (e.target.value.length === 10) {
                    setValue(e.target.value);
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
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendRemoved(e, value);
        }
    };

    const sendRemoved = async (e, pallet) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            if (pallet.substr(2, 8) === props.orderConteiner) {
                const b_quitado = "true";

                var formdata = new FormData();
                formdata.append("b_quitado", b_quitado);

                const result = await fetch(
                    `${Connected.currentURL}api/v1/deposito/partidas/?id_numero_partida=${props.idPartida}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token.access_token}`,
                        },
                        body: formdata,
                    },
                );

                const response = await fetch(
                    `${Connected.currentURL}api/v1/deposito/partidas/?numero=PL${props.orderConteiner}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    },
                );

                const data = await response.json();
                data && props.setRefresh(true);
            } else {
                handleOpenAlert("El código no coincide", "error");
            }
        }
    };

    return (
        <Grid xs={12} sm={6} md={6} lg={3}>
            <Card
                variant="outlined"
                className={props.orderDespacho ? "despachado" : "no-despachado"}
            >
                <CardContent className="card-content">
                    <div className="order-card-header">
                        <Typography variant="h5">Ubicación</Typography>
                    </div>

                    <PalletDetails
                        hall={props.orderHall}
                        col={props.orderCol}
                        row={props.orderRow}
                    />

                    <Grid container spacing={1} className="order-card-grid">
                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <div className="order-card-header">
                                <Typography variant="h5">Pallet</Typography>
                            </div>
                        </Grid>

                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <div className="order-card-header">
                                <Typography variant="h5">Remito</Typography>
                            </div>
                        </Grid>

                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <div className="order-card-header">
                                <Typography variant="h5">Dep. origen</Typography>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="order-card-pallet-display">
                        {props.children}
                    </div>
                </CardContent>

                <CardActions>
                    {!props.orderDespacho ? (
                        <Button
                            variant="contained"
                            size="medium"
                            className="order-card-button"
                            disableElevation
                            onClick={handleOpen}
                        >
                            Quitar
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            size="medium"
                            className="order-card-button despachado"
                            disableElevation
                            disabled
                            startIcon={<CheckCircleIcon />}
                        >
                            Quitado
                        </Button>
                    )}
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Se necesita confirmación"}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Ingrese el código del pallet para confirmar.
                    </DialogContentText>

                    <FormControl
                        error={value === "" ? false : error}
                        size="small"
                        className="order-card-input"
                        fullWidth
                    >
                        <InputLabel htmlFor="component-outlined">
                            Código
                        </InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={value}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                handleKeyDown(e);
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {value === ""
                                ? ""
                                : error
                                ? !validPallet
                                    ? "El código no es valido"
                                    : !validPalletLength
                                    ? "El código es demasiado corto"
                                    : ""
                                : ""}
                        </FormHelperText>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        autoFocus
                        disableElevation
                        className="order-card-button"
                        onClick={() => {
                            handleClose();
                            setValue("");
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
                    {alert}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default OrderCard;
