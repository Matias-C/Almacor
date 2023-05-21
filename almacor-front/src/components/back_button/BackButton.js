import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import "./BackButton.css";

function BackButton() {
    const navigate = useNavigate();

    return (
        <IconButton
            color="primary"
            className="back-button"
            onClick={() => navigate(-1)}
        >
            <ArrowBackIosNewRoundedIcon className="back-button-icon" />
        </IconButton>
    );
}

export default BackButton;
