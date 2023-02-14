import { useNavigate } from "react-router-dom";

import "./ZoneButton.css"

function ZoneButton(props) {

    const navigate = useNavigate();

    return(

        <button className="zone-btn-cont" onClick={() => { navigate(`/depositos/${props.deposit}/${props.zone}/ordenes`); }}>
            <h2>{props.zoneButton}</h2>
        </button>

    );
}

export default ZoneButton;