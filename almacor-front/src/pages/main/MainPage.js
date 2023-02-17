import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Typography, Button } from "@mui/material";

import PageContainer from "../../components/page_container/PageContainer";

import "./MainPage.css"

function ZonesPage(props) {

    const navigate = useNavigate();

    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const getDeposits = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch("https://apicd.almacorweb.com/api/v1/deposito/depositos/?id_empresa=3", {
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
    }, []);

    return(
        
        <>
            <PageContainer>

                <div className="main-page-cont">
                    <div className="main-page-header">

                        <Typography variant="h1" color="primary">Seleccione su Depósito</Typography>

                    </div>

                    <div className="main-page-deposit-buttons">
                        {
                            deposits.map((deposit) => {

                                return (

                                    <Button 
                                        className="main-page-deposit-button"
                                        variant="contained"
                                        size="large"
                                        onClick={() => { navigate(`deposito=${deposit.c_descripcion}`, {state: deposit}); }}

                                        key={deposit.n_id_deposito}
                                    >{deposit.c_descripcion}</Button>

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