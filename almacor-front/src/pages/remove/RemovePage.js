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

import SectionPage from "../../components/section_page/SectionPage";
import { LocationMask } from "../../components/masked-inputs/LocationMask";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import { AlertMessage } from "../../constants/constants";
import usePalletLocationValidation from "../../hooks/usePalletLocationValidation";
import useDialog from "../../hooks/useDialog";

import ContextConnected from "../../context/ContextConnected";

function RemovePage() {
    const Connected = useContext(ContextConnected);

    const [palletInLocation, setPalletInLocation] = useState("");

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

    const removePallet = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=${inputValue}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            const data = await response.json();
            if (data.succes) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.success.removedPallet,
                    "success",
                );
                setInputValue("");
            }
        }
    };

    const removeLocation = async (e) => {
        e.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/partidas/?numero=PL${palletInLocation}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            const data = await response.json();
            if (data.succes) {
                Connected.handleOpenAlert(
                    AlertMessage.location.success.emptiedLocation,
                    "success",
                );
                setInputValue("");
            }
        }
    };

    const getPallet = async (e) => {
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
            if (data.status === "El Pallet ingresado no existe") {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.error.unexistingPallet,
                    "error",
                );
                setInputValue("");
            } else if (
                data.status ===
                "El Pallet ingresado no se encuentra en ninguna ubicacion"
            ) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.error.unlocatedPallet,
                    "error",
                );
                setInputValue("");
            } else if (
                data.status ===
                "El Pallet ingresado se encuentra en una ubicacion"
            ) {
                handleOpenDialog();
            }
        }
    };

    const getPalletInLocation = (palletInLocation) => {
        setPalletInLocation(palletInLocation);
        handleOpenDialog();
    };

    const getLocation = async (e) => {
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
            if (res.status === 400) {
                Connected.handleOpenAlert(
                    AlertMessage.location.error.unexistingLocation,
                    "error",
                );
                setInputValue("");
            }

            if (res.status === 200) {
                Connected.handleOpenAlert(
                    AlertMessage.location.error.emptyLocation,
                    "error",
                );
                setInputValue("");
            }

            data[0].numero && getPalletInLocation(data[0].numero);
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
                        error={inputValue === "" ? false : error}
                        fullWidth
                        className="remove-page-input"
                    >
                        <InputLabel htmlFor="pallet-code">Código</InputLabel>
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
                                ? getPallet(e)
                                : codeType === "UB" && getLocation(e);
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
                        {codeType === "PL"
                            ? "remover un pallet"
                            : codeType === "UB" && "desocupar una ubicación"}
                        , estás seguro?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        className="add-page-button"
                        onClick={(e) => {
                            codeType === "PL"
                                ? removePallet(e)
                                : codeType === "UB" && removeLocation(e);
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
        </>
    );
}

export default RemovePage;
