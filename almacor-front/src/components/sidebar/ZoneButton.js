import { useNavigate } from "react-router-dom";

import "./ZoneButton.css"

function ZoneButton(props) {

    const navigate = useNavigate();

    return(

        <button className="zone-btn-cont" onClick={() => { navigate(`/${props.deposit}/${props.zone}`); }}>
            <h2>{props.zoneButton}</h2>
        </button>

    );
}

export default ZoneButton;