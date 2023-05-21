import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";

import AppContainer from "../../components/app_container/AppContainer";
import BackButton from "../../components/back_button/BackButton";

import ContextConnected from "../../context/ContextConnected";

import "./ZonesPage.css";

function ZonesPage() {
    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();
    const location = useLocation();

    const [zones, setZones] = useState([]);

    useEffect(() => {
        const getZones = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(
                    `${Connected.currentURL}api/v1/deposito/zonas/?id_numero_deposito=${location.state.n_id_deposito}&id_numero_empresa=${Connected.userInfo.n_id_empresa}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    },
                );
                const data = await res.json();
                setZones(data);
            }
        };
        getZones();
    }, [Connected, location]);

    return (
        <>
            <AppContainer>
                <div className="zones-page-cont">
                    <div className="page-header">
                        <BackButton />
                        <Typography variant="h4" className="zones-page-header">
                            {Connected.currentDeposit}
                        </Typography>
                    </div>

                    <Grid container>
                        <Grid xs={12} sm={6} md={5} lg={4}>
                            <Paper
                                variant="outlined"
                                className="zones-page-card"
                            >
                                <Typography variant="h3">
                                    Zonas disponibles
                                </Typography>
                                <hr className="bold-separator"></hr>
                                <div className="zones-page-buttons-cont">
                                    {zones.map((zone) => {
                                        return (
                                            <Button
                                                key={zone.n_id_zona}
                                                variant="contained"
                                                size="large"
                                                className="zones-page-zone-button"
                                                disableElevation
                                                onClick={() => {
                                                    navigate(
                                                        `zona=${zone.c_descripcion
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-",
                                                            )}/ordenes`,
                                                        { state: zone },
                                                    );
                                                    Connected.setLocalZone(
                                                        "id-zone",
                                                        zone.n_id_zona,
                                                        "zone",
                                                        zone.c_descripcion,
                                                    );
                                                }}
                                            >
                                                {zone.c_descripcion}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </AppContainer>
        </>
    );
}

export default ZonesPage;
