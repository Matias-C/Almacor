import { useState } from "react";

const usePalletLocationValidation = () => {
    const [inputValue, setInputValue] = useState("");

    const [codeType, setCodeType] = useState("");
    const [helperText, setHelperText] = useState("");
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);

        if (
            newInputValue.substr(0, 2) === "PL" ||
            newInputValue.substr(0, 2) === "UB"
        ) {
            if (newInputValue.substr(0, 2) === "PL") {
                setCodeType("PL");
                if (newInputValue.length > 9) {
                    setError(false);
                    setDisabled(false);
                } else {
                    setError(true);
                    setDisabled(true);
                    setHelperText("El código es demasiado corto");
                }
            } else if (newInputValue.substr(0, 2) === "UB") {
                setCodeType("UB");
                if (newInputValue.length > 11) {
                    setError(false);
                    setDisabled(false);
                } else {
                    setError(true);
                    setDisabled(true);
                    setHelperText("El código es demasiado corto");
                }
            }
        } else {
            setError(true);
            setDisabled(true);
            setHelperText("El código no es válido");
        }
    };

    return {
        inputValue,
        setInputValue,
        codeType,
        helperText,
        error,
        disabled,
        handleChange,
    };
};

export default usePalletLocationValidation;