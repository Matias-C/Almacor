import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

import { Typography, Button } from "@mui/material";

import PageContainer from "../../components/page_container/PageContainer";

import "./ZonesPage.css";

function ZonesPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const [zones, setZones] = useState([]);

    useEffect(() => {
        const getZones = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/zonas/?id_numero_deposito=${location.state.n_id_deposito}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setZones(data);
            console.log(data);
          }
        };
        getZones();
    }, []);

    return(
        
        <>
            <PageContainer>
                <div className="zones-page-cont">
                    <div className="zones-page-header">

                        <Typography variant="h1" color="primary">Seleccione su Zona</Typography>

                    </div>

                    <div className="zones-page-zone-buttons">
                        {
                            zones.map((zone) => {

                                return (

                                    <Button
                                        className="zones-page-zone-button"
                                        variant="contained"
                                        size="large"
                                        onClick={() => { navigate(`${zone.c_descripcion}/ordenes`, {state: zone}); }}
                                        
                                        key={zone.n_id_zona}
                                    >{zone.c_descripcion}</Button>

                                );


                            })
                        }
                    </div>

                </div>
            </PageContainer>
        </>

    );
}

export default ZonesPage;