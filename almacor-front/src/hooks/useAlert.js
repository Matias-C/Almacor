import { useState } from "react";

const useAlert = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");
    const state = {
        vertical: "top",
        horizontal: "center",
    };
    const { vertical, horizontal } = state;

    const handleOpenAlert = (alert, type) => {
        setAlertType(type);
        setAlertText(alert);
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
        alertType,
        alertText,
        vertical,
        horizontal,
        handleOpenAlert,
        handleCloseAlert,
    };
};

export default useAlert;
