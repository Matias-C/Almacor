import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

import Paper from '@mui/material/Paper';
import { Typography, Button } from "@mui/material";

import PageContainer from "../../components/page_container/PageContainer";
import BackButton from '../../components/back-button/BackButton';

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
                const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/zonas/?id_numero_deposito=${location.state.n_id_deposito}&id_numero_empresa=${Connected.userInfo.n_id_empresa}`, {
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
    }, [Connected.userInfo]);

    return(
        
        <>
            <PageContainer>
                <div className="zones-page-cont">

                    <div className='page-header'>
                        <BackButton />
                        <Typography variant="h1" className='zones-page-header'>{Connected.currentDeposit}</Typography>
                    </div>

                    <Paper variant='outlined' className="zones-page-card">

                        <Typography variant="h2">Zonas disponibles</Typography>
                        <hr className="bold-separator"></hr>
                        <div className='zones-page-buttons-cont'>
                            {
                                zones.map((zone) => {

                                    return (

                                        <Button
                                            key={zone.n_id_zona}
                                            variant="contained"
                                            size="large"
                                            className="zones-page-zone-button"
                                            disableElevation
                                            onClick={() => { 
                                                navigate(`${zone.c_descripcion}/ordenes`, {state: zone});
                                                Connected.setLocalZone("id-zone", zone.n_id_zona, "zone", zone.c_descripcion)
                                            }}
                                        >{zone.c_descripcion}</Button>

                                    );


                                })
                            }
                        </div>
                    </Paper>

                </div>
            </PageContainer>
        </>

    );
}

export default ZonesPage;