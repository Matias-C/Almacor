import { useState } from "react";

const usePalletValidation = () => {
    const [inputPalletValue, setInputPalletValue] = useState("");

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [validPallet, setValidPallet] = useState(false);
    const [validPalletLength, setValidLength] = useState(false);

    const handleChange = (e) => {
        const newInputValue = e.target.value;
        setInputPalletValue(newInputValue);

        if (newInputValue.substr(0, 2) === "PL") {
            setValidPallet(true);
            if (newInputValue.length > 9) {
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
        inputPalletValue,
        setInputPalletValue,
        error,
        disabled,
        validPallet,
        validPalletLength,
        handleChange,
    };
};

export default usePalletValidation;
