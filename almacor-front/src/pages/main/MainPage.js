import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";

import AppContainer from "../../components/app_container/AppContainer";

import ContextConnected from "../../context/ContextConnected";

import "./MainPage.css";

function ZonesPage(props) {
    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [deposits, setDeposits] = useState(null);

    useEffect(() => {
        const getDeposits = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(
                    `${Connected.currentURL}api/v1/deposito/depositos/?id_empresa=${Connected.userInfo.n_id_empresa}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    },
                );
                const data = await res.json();
                setDeposits(data);
            }
        };
        getDeposits();
    }, [Connected]);

    if (deposits === null) {
        return null;
    } else {
        return (
            <AppContainer>
                <div className="main-page-cont">
                    <Typography variant="h1" className="main-page-header">
                        Bienvenido {Connected.userInfo.username}
                    </Typography>

                    <Grid container>
                        <Grid xs={12} sm={6} md={5} lg={4}>
                            <Paper
                                variant="outlined"
                                className="main-page-card"
                            >
                                <Typography variant="h3">
                                    Tus depósitos
                                </Typography>
                                <hr className="bold-separator"></hr>

                                <div className="main-page-buttons-cont">
                                    {deposits.map((deposit) => {
                                        return (
                                            <Button
                                                key={deposit.n_id_deposito}
                                                variant="contained"
                                                size="large"
                                                disableElevation
                                                className="main-page-deposit-button"
                                                onClick={() => {
                                                    navigate(
                                                        `deposito=${deposit.c_descripcion
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-",
                                                            )}`,
                                                        { state: deposit },
                                                    );
                                                    Connected.setLocalDeposit(
                                                        "id-deposit",
                                                        deposit.n_id_deposito,
                                                        "deposit",
                                                        deposit.c_descripcion,
                                                    );
                                                }}
                                            >
                                                {deposit.c_descripcion}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </AppContainer>
        );
    }
}

export default ZonesPage;
