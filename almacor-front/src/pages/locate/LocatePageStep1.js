import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SectionPage from "../../components/section_page/SectionPage";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import usePalletValidation from "../../hooks/usePalletValidation";
import useAlert from "../../hooks/useAlert";

import ContextConnected from "../../context/ContextConnected";

import "./LocatePage.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LocatePageStep1() {
    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const {
        inputPalletValue,
        setInputPalletValue,
        error,
        disabled,
        validPallet,
        validPalletLength,
        handleChange,
    } = usePalletValidation();

    const {
        openAlert,
        alertType,
        alertText,
        vertical,
        horizontal,
        handleOpenAlert,
        handleCloseAlert,
    } = useAlert();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            checkPallet(e, inputPalletValue);
        }
    };

    const checkPallet = async (e, pallet) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=${pallet}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            console.log(res.status);
            const data = await res.json();
            if (data.error) {
                handleOpenAlert("Este pallet no existe", "error");
                setInputPalletValue("");
            }
            if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                handleOpenAlert("Este pallet ya fue ubicado", "error");
                setInputPalletValue("");
            } else if (
                data.status ===
                "El Pallet ingresado no se encuentra en ninguna ubicacion"
            ) {
                navigate(pallet, {
                    state: {
                        pallet: pallet,
                        url: window.location.href.toString(),
                    },
                });
            }
        }
    };

    return (
        <>
            <SectionPage sectionHeader="Ubicar">
                <CardContent>
                    <Typography variant="h4">
                        Ingrese el código del pallet
                    </Typography>
                    <hr className="separator" />

                    <FormControl
                        error={inputPalletValue === "" ? false : error}
                        size="small"
                        fullWidth
                        className="add-page-input"
                    >
                        <InputLabel>Código</InputLabel>
                        <OutlinedInput
                            id="pallet-code"
                            label="Código"
                            value={inputPalletValue}
                            onChange={handleChange}
                            autoFocus
                            onKeyDown={(e) => {
                                handleKeyDown(e);
                            }}
                            inputComponent={PalletMask}
                        />
                        <FormHelperText>
                            {inputPalletValue === ""
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
                </CardContent>

                <CardActions>
                    <Button
                        disabled={disabled}
                        variant="contained"
                        size="medium"
                        disableElevation
                        className="add-page-button"
                        onClick={(e) => {
                            checkPallet(e, inputPalletValue);
                        }}
                    >
                        Siguiente
                    </Button>
                </CardActions>
            </SectionPage>

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

export default LocatePageStep1;
