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

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SectionPage from "../../components/section_page/SectionPage";
import ListedPallet from "../../components/unify/ListedPallet";
import { PalletMask } from "../../components/masked-inputs/PalletMask";

import ContextConnected from "../../context/ContextConnected";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UnifyPage() {
    const Connected = useContext(ContextConnected);

    const [pallets, setPallets] = useState([]);
    const [value, setValue] = useState("");

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [errorAlert, setErrorAlert] = useState("");
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const state = {
        vertical: "top",
        horizontal: "center",
    };
    const { vertical, horizontal } = state;

    const checkValidPallet = (pallet) => {
        if (pallet.substr(0, 2) === "PL") {
            setValidPallet(true);
            checkPalletLength(pallet);
        } else {
            setValidPallet(false);
            setError(true);
            setDisabled(true);
        }
    };

    const checkPalletLength = (pallet) => {
        if (pallet.length > 9) {
            setValidLength(true);
            setError(false);
            setDisabled(false);
        } else {
            setValidLength(false);
            setError(true);
            setDisabled(true);
        }
    };

    const handleChangePallet = (e) => {
        const pallet = e.target.value;
        setValue(pallet);
        checkValidPallet(pallet);
    };

    const handleOpenAlert = (error) => {
        setErrorAlert(error);
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addPallet(e.target.value);
        }
    };

    const addPallet = (palletToAdd) => {
        const palletIndexToAdd = `\'${palletToAdd.substr(2, 10)}\'`;
        if (!disabled) {
            if (pallets.indexOf(palletIndexToAdd) > -1) {
                handleOpenAlert("El pallet se encuentra duplicado", "error");
                setValue("");
            } else {
                setPallets([...pallets, palletIndexToAdd]);
                setValue("");
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
            if (data.error) {
                handleOpenAlert(data.error, "error");
            }
            console.log(
                "🚀 ~ file: UnifyPage.js:118 ~ unifyPallets ~ data:",
                data,
            );
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
                            onChange={handleChangePallet}
                            autoFocus
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
                </CardContent>

                <CardActions>
                    <Button
                        disabled={disabled}
                        variant="contained"
                        size="medium"
                        disableElevation
                        className="add-page-button"
                        onClick={() => {
                            addPallet(value);
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

            <Snackbar
                open={openAlert}
                autoHideDuration={2200}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errorAlert}
                </Alert>
            </Snackbar>
        </>
    );
}

export default UnifyPage;