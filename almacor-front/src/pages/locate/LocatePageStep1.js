import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import SectionPage from "../../components/section_page/SectionPage";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import { AlertMessage } from "../../constants/constants";
import usePalletValidation from "../../hooks/usePalletValidation";

import ContextConnected from "../../context/ContextConnected";

import "./LocatePage.css";

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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!error) {
                checkPallet(e, inputPalletValue);
            }
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
            const data = await res.json();
            if (data.error) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.error.unexistingPallet,
                    "error",
                );
                setInputPalletValue("");
            }
            if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.error.alreadyLocatedPallet,
                    "error",
                );
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
        </>
    );
}

export default LocatePageStep1;
