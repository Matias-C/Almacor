import { useState, useEffect } from "react";

import ZoneButton from './ZoneButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import "./DropButton.css"

function DropButton(props) {

    const [droppedButton, setButtonDropped] = useState(false)

    const [zones, setZones] = useState([]);

    useEffect(() => {
        const getZones = async () => {
          const token = await JSON.parse(localStorage.getItem("token"));
          if (token) {
            const res = await fetch(`https://apicd.almacorweb.com/api/v1/deposito/zonas/?id_numero_deposito=${props.idDeposit}`, {
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

    const DropButton = () => {
        setButtonDropped(!droppedButton)
    }

    return(

        <>
            {props.sidebarOpen ? (

                    <div className={droppedButton? "drop-btn-cont dropped" : "drop-btn-cont"} onClick={DropButton}>

                    <div className='drop-btn'>

                        <h2>{props.button}</h2>
                        <KeyboardArrowRightIcon className={droppedButton ? "drop-btn-arrow dropped" : "drop-btn-arrow"} />

                    </div>

                    {droppedButton ? 
                        (
                            <div className='drop-btn-buttons-cont'>

                            {
                                zones.map((zone) => {

                                    return (

                                        <ZoneButton
                                            key={zone.n_id_zona}
                                            zoneButton={zone.c_descripcion}
                                            deposit={props.deposit}
                                            zone={zone.c_descripcion}
                                            zones={zones}
                                        />

                                    );


                                })
                            }

                            </div>
                        )
                        : 
                            null
                    }

                    </div>

                )
                :
                null
            }
        </>

        
    );
}

export default DropButton; 