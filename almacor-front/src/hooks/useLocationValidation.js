import { useState, useContext } from "react";

import ContextConnected from "../context/ContextConnected";

const useLocationValidation = () => {
    const Connected = useContext(ContextConnected);
    const deposit = parseInt(Connected.currentDepositId);
    const zone = parseInt(Connected.currentZoneId);

    const [inputLocationValue, setInputLocationValue] = useState("");

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [validLocation, setValidLocation] = useState(false);
    const [validLocationLength, setValidLocationLength] = useState(false);
    const [validDeposit, setValidDeposit] = useState(false);
    const [validZone, setValidZone] = useState(false);

    const handleChange = (e) => {
        const newInputValue = e.target.value;
        setInputLocationValue(newInputValue);

        if (newInputValue.substr(0, 2) === "UB") {
            setValidLocation(true);
            if (parseInt(newInputValue.substr(2, 2)) === deposit) {
                setValidDeposit(true);
                if (parseInt(newInputValue.substr(4, 2)) === zone) {
                    setValidZone(true);
                    if (newInputValue.length > 11) {
                        setValidLocationLength(true);
                        setDisabled(false);
                        setError(false);
                    } else {
                        setValidLocationLength(false);
                        setDisabled(true);
                        setError(true);
                    }
                } else {
                    setValidZone(false);
                    setDisabled(true);
                    setError(true);
                }
            } else {
                setValidDeposit(false);
                setDisabled(true);
                setError(true);
            }
        } else {
            setValidLocation(false);
            setDisabled(true);
            setError(true);
        }
    };

    return {
        inputLocationValue,
        setInputLocationValue,
        error,
        disabled,
        validLocation,
        validLocationLength,
        validDeposit,
        validZone,
        deposit,
        zone,
        handleChange,
    };
};

export default useLocationValidation;
