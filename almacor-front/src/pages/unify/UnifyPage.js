import React, { useState, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import SectionPage from "../../components/section_page/SectionPage";
import ListedPallet from "../../components/unify/ListedPallet";
import { PalletMask } from "../../components/masked-inputs/PalletMask";
import { AlertMessage } from "../../constants/constants";
import usePalletValidation from "../../hooks/usePalletValidation";

import ContextConnected from "../../context/ContextConnected";

function UnifyPage() {
    const Connected = useContext(ContextConnected);

    const [pallets, setPallets] = useState([]);
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
        const newPallet = e.target.value;

        if (e.key === "Enter") {
            addPallet(newPallet);
        }
    };

    const addPallet = (palletToAdd) => {
        const palletIndexToAdd = `\'${palletToAdd.substr(2, 10)}\'`;
        if (!disabled) {
            if (pallets.indexOf(palletIndexToAdd) > -1) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.error.duplicatePallet,
                    "error",
                );
                setInputPalletValue("");
            } else {
                setPallets([...pallets, palletIndexToAdd]);
                setInputPalletValue("");
            }
        }
    };

    const removePallet = (palletToRemove) => {
        const newPalletArray = pallets;
        newPalletArray.splice(palletToRemove, 1);
        setPallets([...newPalletArray]);
    };

    const unifyPallets = async (e) => {
        e?.preventDefault();

        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const id_empresa = Connected.userInfo.n_id_empresa;
            const pallet_codes = pallets;

            var formdata = new FormData();
            formdata.append("n_id_empresa", id_empresa);
            formdata.append("pallet_codes", pallet_codes);

            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/agrupar_pallets/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                    body: formdata,
                },
            );
            const data = await response.json();
            if (response.status === 400) {
                Connected.handleOpenAlert(
                    data.status,
                    "error",
                );
            }
            if (response.status === 200) {
                Connected.handleOpenAlert(
                    data.status,
                    "success",
                );
            }
        }
    };

    return (
        <>
            <SectionPage sectionHeader="Unificar Pallets">
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
                        onClick={() => {
                            addPallet(inputPalletValue);
                        }}
                    >
                        Añadir
                    </Button>

                    <Button
                        disabled={pallets.length < 2 ? true : false}
                        variant="outlined"
                        size="medium"
                        disableElevation
                        className="add-page-button"
                        onClick={(e) => {
                            unifyPallets(e);
                        }}
                    >
                        Unificar
                    </Button>
                </CardActions>

                {pallets?.length > 0 && (
                    <CardContent>
                        <Grid container spacing={1}>
                            {pallets?.map((pallet, i) => (
                                <Grid
                                    key={i}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    xl={6}
                                >
                                    <ListedPallet
                                        key={i}
                                        index={i}
                                        pallet={pallet.replace(/'/gi, "")}
                                        removePallet={removePallet}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                )}
            </SectionPage>
        </>
    );
}

export default UnifyPage;
