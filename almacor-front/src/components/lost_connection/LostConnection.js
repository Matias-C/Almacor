import Typography from "@mui/material/Typography";

import "./LostConnection.css";

function LostConnection() {
    return (
        <div className="lost-cont">
            <Typography variant="h1" className="lost-header">
                Estás desconectado!
            </Typography>
            <Typography variant="h5" className="lost-info">
                Por favor, revisa tu conexión para seguir usando nuestra
                aplicación.
            </Typography>
        </div>
    );
}

export default LostConnection;
