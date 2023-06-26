import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CardContent from "@mui/material/CardContent";
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

import Skeleton from "@mui/material/Skeleton";

import SectionPage from "../../components/section_page/SectionPage";
import PalletDetails from "../../components/pallet_details/PalletDetails";
import PalletDetailsSkeleton from "../../components/pallet_details/PalletDetailsSkeleton";
import { LocationMask } from "../../components/masked-inputs/LocationMask";
import { AlertMessage } from "../../constants/constants";
import useLocationValidation from "../../hooks/useLocationValidation";
import useDialog from "../../hooks/useDialog";

import ContextConnected from "../../context/ContextConnected";

import "./LocatePage.css";

function LocatePageStep3() {
    const Connected = useContext(ContextConnected);
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const weight = location.state.pallet.n_tipopeso;
    const height = location.state.pallet.n_tipoaltura;
    const [ub, setUb] = useState("");
    const [idHall, setIdHall] = useState("");
    const [hall, setHall] = useState("");
    const [col, setCol] = useState("");
    const [row, setRow] = useState("");

    const {
        inputLocationValue,
        setInputLocationValue,
        error,
        disabled,
        validLocation,
        validLocationLength,
        validDeposit,
        validZone,
        deposit,
        zone,
        handleChange,
    } = useLocationValidation();

    const { openDialog, handleOpenDialog, handleCloseDialog } = useDialog();

    useEffect(() => {
        const generateLocation = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const id_empresa = Connected.userInfo.n_id_empresa;
                const id_deposito = deposit;
                const id_zona = zone;
                const tipo_peso = weight;
                const tipo_altura = height;

                var formdata = new FormData();
                formdata.append("id_empresa", id_empresa);
                formdata.append("id_deposito", id_deposito);
                formdata.append("id_zona", id_zona);
                formdata.append("tipo_peso", tipo_peso);
                formdata.append("tipo_altura", tipo_altura);

                const response = await fetch(
                    `${Connected.currentURL}api/v1/deposito/generar_ubic_pallet/`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token.access_token}`,
                        },
                        body: formdata,
                    },
                );
                const data = await response.json();
                setUb(data.UB);
                setIdHall(data.n_id_pasillo);
                setHall(data.c_pasillo);
                setCol(data.n_id_columna);
                setRow(data.n_id_fila);
                setLoading(false);
            }
        };
        generateLocation();
    }, [Connected, deposit, zone, weight, height]);

    const newLocation = (e) => {
        e.preventDefault();

        const newHall = parseInt(inputLocationValue.substr(6, 2));
        const newCol = parseInt(inputLocationValue.substr(8, 2));
        const newRow = parseInt(inputLocationValue.substr(10, 2));

        locatePallet(newHall, newCol, newRow);
    };

    const locatePallet = async (hall, col, row) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const id_empresa = Connected.userInfo.n_id_empresa;
            const id_deposito = deposit;
            const id_zona = zone;
            const id_pasillo = hall;
            const id_columna = col;
            const id_fila = row;
            const id_partida = location.state.pallet.n_id_partida;

            var formdata = new FormData();
            formdata.append("id_empresa", id_empresa);
            formdata.append("id_deposito", id_deposito);
            formdata.append("id_zona", id_zona);
            formdata.append("id_pasillo", id_pasillo);
            formdata.append("id_columna", id_columna);
            formdata.append("id_fila", id_fila);
            formdata.append("id_partida", id_partida);

            const response = await fetch(
                `${Connected.currentURL}api/v1/deposito/ubicar_pallet_en_posicion/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    },
                    body: formdata,
                },
            );
            const data = await response.json();
            console.log(response);
            console.log(data);
            console.log(id_zona, id_pasillo, id_columna, id_fila);
            
            if (response.status === 200) {
                Connected.handleOpenAlert(
                    AlertMessage.pallet.success.locatedPallet,
                    "success",
                );
                navigate(-2);
            }
        }
    };

    const checkLocation = async (location) => {
        const token = await JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch(
                `${Connected.currentURL}api/v1/deposito/ubic_pallet/?ubic=${location}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                },
            );
            const data = await res.json();
            console.log(res);
            console.log(data);
            if (data.status === "Esta posicion se encuentra vacia") {
                if (location === ub) {
                    locatePallet(idHall, col, row);
                } else {
                    Connected.handleOpenAlert(
                        AlertMessage.location.waring.unmatchedLocation,
                        "warning",
                    );
                    handleOpenDialog();
                }
            } else {
                Connected.handleOpenAlert(
                    AlertMessage.location.error.alreadyFilledLocation,
                    "error",
                );
                setInputLocationValue("");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!error) {
                checkLocation(e.target.value);
            }
        }
    };

    return (
        <>
            <SectionPage sectionHeader="Ubicar">
                <CardContent>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="text"
                                width="50%"
                                sx={{ fontSize: "20px" }}
                                animation="wave"
                            />
                            <Skeleton>
                                <hr className="separator" />
                            </Skeleton>

                            <PalletDetailsSkeleton />

                            <Skeleton
                                variant="text"
                                width="70%"
                                sx={{ fontSize: "20px" }}
                                animation="wave"
                                style={{ margin: "16px 0 12px" }}
                            />
                            <Skeleton
                                variant="rounded"
                                height={40}
                                animation="wave"
                            />
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h4"
                                className="add-page-card-header"
                            >
                                {location.state.pallet.c_tipo_contenido}
                                {location.state.pallet.c_numero}{" "}
                                <span>/ Ubicación</span>
                            </Typography>
                            <hr className="separator" />

                            <PalletDetails hall={hall} col={col} row={row} />

                            <Typography
                                variant="h5"
                                className="step-three add-page-label"
                            >
                                Ingrese la ubicación para confirmar
                            </Typography>

                            <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={
                                    inputLocationValue === "" ? false : error
                                }
                            >
                                <InputLabel>Ubicación</InputLabel>
                                <OutlinedInput
                                    id="pallet-code"
                                    label="Ubicación"
                                    value={inputLocationValue}
                                    autoFocus
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        handleKeyDown(e);
                                    }}
                                    inputComponent={LocationMask}
                                />
                                <FormHelperText>
                                    {inputLocationValue === ""
                                        ? ""
                                        : error
                                        ? !validLocation
                                            ? "Código no válido"
                                            : !validDeposit
                                            ? "El depósito no coincide con tu depósito actual"
                                            : !validZone
                                            ? "La zona no coincide con tu zona actual"
                                            : !validLocationLength
                                            ? "El código es demasiado corto"
                                            : ""
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                        </>
                    )}
                </CardContent>
            </SectionPage>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>La ubicación no coincide</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Estás ubicando el pallet en una ubicación distinta a la
                        recomendada, estás seguro?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        disabled={disabled}
                        className="add-page-button"
                        onClick={(e) => {
                            newLocation(e);
                            handleCloseDialog();
                        }}
                    >
                        Aceptar
                    </Button>
                    <Button
                        variant="contained"
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

export default LocatePageStep3;
