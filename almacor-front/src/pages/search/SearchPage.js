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

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SectionPage from "../../components/section_page/SectionPage";
import PalletDetails from "../../components/pallet_details/PalletDetails";
import { LocationMask } from "../../components/masked-inputs/LocationMask";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import usePalletLocationValidation from "../../hooks/usePalletLocationValidation";
import useDialog from "../../hooks/useDialog";
import useAlert from "../../hooks/useAlert";

import ContextConnected from "../../context/ContextConnected";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SearchPalletPage() {
    const Connected = useContext(ContextConnected);

    const [pallet, setPallet] = useState([]);

    const {
        inputValue,
        setInputValue,
        codeType,
        helperText,
        error,
        disabled,
        handleChange,
    } = usePalletLocationValidation();

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

    const searchPallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=${inputValue}`,
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
                setInputValue("");
            }
            if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                handleOpenAlert("Se encontró el pallet", "success");
                setPallet(data.data[0]);
                handleOpenDialog();
            } else if (
                data.status ===
                "El Pallet ingresado no se encuentra en ninguna ubicacion"
            ) {
                handleOpenAlert("Este pallet no fue ubicado", "error");
                setInputValue("");
            }
        }
    };

    const searchLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${inputValue}`,
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
                setInputValue("");
            } else if (data.status === "Esta posicion se encuentra vacia") {
                handleOpenAlert("Esta posición está vacía", "error");
                setInputValue("");
            } else if (data) {
                handleOpenAlert("Se encontró la ubicación", "success");
                setPallet(data[0]);
                handleOpenDialog();
            }
        }
    };

    return (
        <>
            <SectionPage sectionHeader="Localizar">
                <CardContent>
                    <Typography variant="h4">Ingrese el código</Typography>
                    <hr className="separator" />

                    <FormControl
                        error={inputValue === "" ? false : error}
                        size="small"
                        fullWidth
                        className="add-page-input"
                    >
                        <InputLabel>Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={inputValue}
                            onChange={handleChange}
                            autoFocus
                            inputComponent={
                                codeType
                                    ? codeType === "PL"
                                        ? PalletMask
                                        : LocationMask
                                    : PalletMask
                            }
                        />
                        <FormHelperText>
                            {inputValue === "" ? "" : error ? helperText : ""}
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
                            codeType === "PL"
                                ? searchPallet(e)
                                : codeType === "UB" && searchLocation(e);
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
                    {alertText}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SearchPalletPage;
