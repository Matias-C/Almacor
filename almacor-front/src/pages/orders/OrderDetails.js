import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import OrderCard from '../../components/orders/OrderCard';

import "./OrderDetails.css"

function OrderDetails() {

    const location = useLocation();

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/ordenpartidasdt/?id_orden_carga=${location.state.n_id_orden_de_carga}`, {
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

                    <Typography variant='h2'>Orden {location.state.n_id_orden_de_carga}</Typography>

                </div>
                
                <Typography variant='h2'>{location.state.c_descripcion}</Typography>
            </div>

            <div className='order-details-cards'>

                <Grid container spacing={2}>

                    {
                        details.map((detail) => {

                            return (

                                <OrderCard
                                    key={detail.n_id_pk}
                                    idPartida={detail.n_id_partida}
                                    orderConteiner={detail.c_numero}
                                    orderRemito={detail.c_remito}
                                    orderDeposit={detail.ubicacion.deposito}
                                    orderZone={detail.ubicacion.zona}
                                    orderHall={detail.ubicacion.c_pasillo}
                                    orderCol={detail.ubicacion.columna}
                                    orderRow={detail.ubicacion.fila}
                                    orderDespacho={detail.b_quitado}
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