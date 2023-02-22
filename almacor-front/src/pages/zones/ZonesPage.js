import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

import { Typography, Button } from "@mui/material";

import PageContainer from "../../components/page_container/PageContainer";

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
                                        key={zone.n_id_zona}
                                        variant="contained"
                                        size="large"
                                        className="zones-page-zone-button"
                                        onClick={() => { 
                                            navigate(`${zone.c_descripcion}/ordenes`, {state: zone});
                                            Connected.setLocalZone(zone.n_id_zona)
                                        }}
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