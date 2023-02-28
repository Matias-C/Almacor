import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import { Typography, Button } from "@mui/material";

import PageContainer from "../../components/page_container/PageContainer";

import ContextConnected from "../../context/ContextConnected";

import "./MainPage.css"

function ZonesPage(props) {

    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const getDeposits = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/depositos/?id_empresa=${Connected.userInfo.n_id_empresa}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access_token}`
              },
            })
            const data = await res.json();
            setDeposits(data);
            console.log(data);
          }
        };
        getDeposits();
    }, [Connected.userInfo]);

    if (Connected.userInfo === null) {
        return null;
    } else {

        return(
        
            <PageContainer>

                <div className="main-page-cont">

                    <Typography variant="h1" className="main-page-header">Bienvenido {Connected.userInfo.username}</Typography>

                    <Paper variant='outlined' className="main-page-card">
                    
                        <Typography variant="h2">Tus depósitos</Typography>
                        <hr className="bold-separator"></hr>

                        <div className="main-page-buttons-cont">
                            {
                                deposits.map((deposit) => {

                                    return (

                                        <Button
                                            key={deposit.n_id_deposito}
                                            variant="contained"
                                            size="large"
                                            disableElevation
                                            className="main-page-deposit-button"
                                            onClick={() => { 
                                                navigate(`deposito=${deposit.c_descripcion}`, {state: deposit});
                                                Connected.setLocalDeposit("id-deposit", deposit.n_id_deposito, "deposit", deposit.c_descripcion)
                                            }}
                                        >{deposit.c_descripcion}</Button>

                                    );


                                })
                            }
                        </div>
                    </Paper>

                </div>
            </PageContainer>
        );

    }
}

export default ZonesPage;