import { useState } from "react";

const usePalletValidation = () => {
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);

        if (e.target.value.substr(0, 2) === "PL") {
            setValidPallet(true);
            if (e.target.value.length > 9) {
                setValidLength(true);
                setError(false);
                setDisabled(false);
            } else {
                setValidLength(false);
                setError(true);
                setDisabled(true);
            }
        } else {
            setValidPallet(false);
            setError(true);
            setDisabled(true);
        }
    };

    return {
        value,
        setValue,
        error,
        disabled,
        validPallet,
        validPalletLength,
        handleChange,
    };
};

export default usePalletValidation;
