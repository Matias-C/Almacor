import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'; 

import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import OrderCard from '../../components/orders/OrderCard';

import ContextConnected from '../../context/ContextConnected';

import "./OrderDetails.css"

function OrderDetails() {

    const Connected = useContext(ContextConnected)
    const location = useLocation();

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(`${Connected.currentURL}api/v1/deposito/ordenpartidasdt/?id_orden_carga=${location.state.n_id_orden_de_carga}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.access_token}`
                    },
                })
                const data = await res.json();
                setDetails(data);
                console.log(data);
            }
        };
        getDetails();
    }, []);

    return(

        <div className="order-details-cont">

            <div className="order-details-header">
                <div className="order-details-number">

                    <Typography variant='h3'>Orden {location.state.n_id_orden_de_carga}</Typography>

                </div>
                
                <Typography variant='h3'>{location.state.c_descripcion}</Typography>
            </div>

            <div className='order-details-cards'>

                <Grid container spacing={2}>

                    {
                        details.filter(detail => detail.b_quitado.toString().includes("f")).map(filteredDetail => {

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
                                />

                            );


                        })
                    }
                    {
                        details.filter(detail => detail.b_quitado.toString().includes("t")).map(filteredDetail => {

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
                                />

                            );


                        })
                    }

                </Grid>

            </div>

        </div>

    );
}

export default OrderDetails;