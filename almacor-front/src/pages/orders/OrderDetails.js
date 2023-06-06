import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";

import DisplayDetailsPage from "../../components/display/DisplayDetailsPage";
import OrderCardSkeleton from "../../components/orders/OrderCardSkeleton";
import OrderCard from "../../components/orders/OrderCard";
import OrderCardPalletDisplay from "../../components/orders/OrderCardPalletDisplay";

import ContextConnected from "../../context/ContextConnected";

function Details({ details, setRefresh }) {
    const createPalletArray = (partidas) => {
        const pallets = [];
        partidas.map((partida) => {
            pallets.push(partida.c_numero);
        });

        return pallets;
    };

    return (
        <>
            {details?.map((filteredDetail) => {
                return (
                    <OrderCard
                        key={
                            filteredDetail.n_id_grupo
                                ? filteredDetail.n_id_grupo
                                : filteredDetail.n_id_partida
                        }
                        orderType={
                            filteredDetail.n_id_grupo
                                ? "group order"
                                : "individual order"
                        }
                        orderIdPartida={
                            filteredDetail.n_id_grupo
                                ? filteredDetail.partidas[0].n_id_partida
                                : filteredDetail.n_id_partida
                        }
                        orderPallet={
                            filteredDetail.n_id_grupo
                                ? createPalletArray(filteredDetail.partidas)
                                : filteredDetail.c_numero
                        }
                        orderHall={
                            filteredDetail.n_id_grupo
                                ? filteredDetail.partidas[0].ubicacion
                                    ?.c_pasillo
                                : filteredDetail.ubicacion?.c_pasillo
                        }
                        orderCol={
                            filteredDetail.n_id_grupo
                                ? filteredDetail.partidas[0].ubicacion
                                    ?.n_id_columna
                                : filteredDetail.ubicacion?.n_id_columna
                        }
                        orderRow={
                            filteredDetail.n_id_grupo
                                ? filteredDetail.partidas[0].ubicacion
                                    ?.n_id_fila
                                : filteredDetail.ubicacion?.n_id_fila
                        }
                        orderDespacho={filteredDetail.b_quitado}
                        setRefresh={setRefresh}
                    >
                        {filteredDetail.n_id_grupo ? (
                            filteredDetail.partidas.map((partida) => (
                                <OrderCardPalletDisplay
                                    key={partida.n_id_partida}
                                    pallet={partida.c_numero}
                                    remito={partida.c_remito}
                                    originDeposit={partida.c_deposito_origen}
                                />
                            ))
                        ) : (
                            <OrderCardPalletDisplay
                                pallet={filteredDetail.c_numero}
                                remito={filteredDetail.c_remito}
                                originDeposit="-"
                            />
                        )}
                    </OrderCard>
                );
            })}
        </>
    );
}

function OrderDetails() {
    const Connected = useContext(ContextConnected);
    const location = useLocation();

    const [loading, setLoading] = useState(true);

    const [details, setDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getDetails = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(
                    `${Connected.currentURL}api/v1/deposito/ordenpartidasdt/?id_orden_carga=${location.state.n_id_orden_de_carga}&id_empresa=${Connected.userInfo.n_id_empresa}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    },
                );
                const data = await res.json();
                setDetails(data);
                setRefresh(false);
                setLoading(false);
                console.log(data);
            }
        };
        getDetails();
    }, [Connected, location, refresh]);

    return (
        <DisplayDetailsPage
            detailsHeaderDetail={location.state.n_id_orden_de_carga}
            detailsHeader={location.state.c_descripcion}
        >
            <Grid container spacing={2}>
                {loading ? (
                    <>
                        <OrderCardSkeleton />
                        <OrderCardSkeleton />
                    </>
                ) : (
                    <Details details={details} setRefresh={setRefresh} />
                )}
            </Grid>
        </DisplayDetailsPage>
    );
}

export default OrderDetails;

/*
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";

import DisplayDetailsPage from "../../components/display/DisplayDetailsPage";
import OrderCardSkeleton from "../../components/orders/OrderCardSkeleton";
import OrderCard from "../../components/orders/OrderCard";

import ContextConnected from "../../context/ContextConnected";

function Details({ details, setRefresh }) {
    return (
        <>
            {details
                .filter((detail) => detail.b_quitado.toString().includes("f"))
                .map((filteredDetail) => {
                    return (
                        <OrderCard
                            key={filteredDetail.n_id_pk}
                            idPartida={filteredDetail.n_id_partida}
                            orderConteiner={filteredDetail.c_numero}
                            orderRemito={filteredDetail.c_remito}
                            orderDeposit={filteredDetail.ubicacion.deposito}
                            orderZone={filteredDetail.ubicacion.zona}
                            orderHall={filteredDetail.ubicacion.c_pasillo}
                            orderCol={filteredDetail.ubicacion.columna}
                            orderRow={filteredDetail.ubicacion.fila}
                            orderDespacho={filteredDetail.b_quitado}
                            setRefresh={setRefresh}
                        />
                    );
                })}
            {details
                .filter((detail) => detail.b_quitado.toString().includes("t"))
                .map((filteredDetail) => {
                    return (
                        <OrderCard
                            key={filteredDetail.n_id_pk}
                            idPartida={filteredDetail.n_id_partida}
                            orderConteiner={filteredDetail.c_numero}
                            orderRemito={filteredDetail.c_remito}
                            orderDeposit={filteredDetail.ubicacion.deposito}
                            orderZone={filteredDetail.ubicacion.zona}
                            orderHall={
                                filteredDetail.ubicacion.info
                                    ? "-"
                                    : filteredDetail.ubicacion.c_pasillo
                            }
                            orderCol={
                                filteredDetail.ubicacion.info
                                    ? "-"
                                    : filteredDetail.ubicacion.columna
                            }
                            orderRow={
                                filteredDetail.ubicacion.info
                                    ? "-"
                                    : filteredDetail.ubicacion.fila
                            }
                            orderDespacho={filteredDetail.b_quitado}
                        />
                    );
                })}
        </>
    );
}

*/
