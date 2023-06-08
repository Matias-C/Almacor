import { useState } from "react";

const useAlert = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alert, setAlert] = useState("");
    const state = {
        vertical: "top",
        horizontal: "center",
    };
    const { vertical, horizontal } = state;

    const handleOpenAlert = (alert, type) => {
        setAlertType(type);
        setAlert(alert);
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    return {
        openAlert,
        setOpenAlert,
        alertType,
        setAlertType,
        alert,
        setAlert,
        vertical,
        horizontal,
    };
};

export default useAlert;
