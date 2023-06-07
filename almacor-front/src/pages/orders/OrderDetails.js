import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";

import DisplayDetailsPage from "../../components/display/DisplayDetailsPage";
import OrderCardSkeleton from "../../components/orders/OrderCardSkeleton";
import OrderCard from "../../components/orders/OrderCard";
import OrderCardPalletDisplay from "../../components/orders/OrderCardPalletDisplay";

import ContextConnected from "../../context/ContextConnected";

function DeparturesDisplay({ departures, setRefresh }) {
    const filteredDepartures = [];

    const activeDepartures = departures?.filter((departure) =>
        departure.b_quitado.toString().includes("f"),
    );
    const removedDepartures = departures?.filter((departure) =>
        departure.b_quitado.toString().includes("t"),
    );

    Array.prototype.push.apply(
        filteredDepartures,
        activeDepartures,
        removedDepartures,
    );

    const createPalletArrayForGroup = (departures) => {
        const pallets = [];
        departures.map((departure) => {
            pallets.push(departure.c_numero);
        });

        return pallets;
    };

    return (
        <>
            {filteredDepartures?.map((departure) => {
                return (
                    <OrderCard
                        key={
                            departure.n_id_grupo
                                ? departure.n_id_grupo
                                : departure.n_id_partida
                        }
                        orderType={
                            departure.n_id_grupo
                                ? "group order"
                                : "individual order"
                        }
                        orderIdPartida={
                            departure.n_id_grupo
                                ? departure.partidas[0].n_id_partida
                                : departure.n_id_partida
                        }
                        orderPallet={
                            departure.n_id_grupo
                                ? createPalletArrayForGroup(departure.partidas)
                                : departure.c_numero
                        }
                        orderHall={
                            departure.n_id_grupo
                                ? departure.partidas[0].ubicacion?.c_pasillo
                                : departure.ubicacion?.c_pasillo
                        }
                        orderCol={
                            departure.n_id_grupo
                                ? departure.partidas[0].ubicacion?.n_id_columna
                                : departure.ubicacion?.n_id_columna
                        }
                        orderRow={
                            departure.n_id_grupo
                                ? departure.partidas[0].ubicacion?.n_id_fila
                                : departure.ubicacion?.n_id_fila
                        }
                        orderDespacho={departure.b_quitado}
                        setRefresh={setRefresh}
                    >
                        {departure.n_id_grupo ? (
                            departure.partidas.map((partida) => (
                                <OrderCardPalletDisplay
                                    key={partida.n_id_partida}
                                    pallet={partida.c_numero}
                                    remito={partida.c_remito}
                                    originDeposit={partida.c_deposito_origen}
                                />
                            ))
                        ) : (
                            <OrderCardPalletDisplay
                                pallet={departure.c_numero}
                                remito={departure.c_remito}
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

    const [departures, setDepartures] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getDepartures = async () => {
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
                setDepartures(data);
                setRefresh(false);
                setLoading(false);
            }
        };
        getDepartures();
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
                    <DeparturesDisplay
                        departures={departures}
                        setRefresh={setRefresh}
                    />
                )}
            </Grid>
        </DisplayDetailsPage>
    );
}

export default OrderDetails;
