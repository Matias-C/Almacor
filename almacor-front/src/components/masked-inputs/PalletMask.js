import React from "react";

import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

export const PalletMask = React.forwardRef(function PalletMask(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##00000000"
            definitions={{
                "#": /[A-Z]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { value } })}
            overwrite
        />
    );
});

PalletMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};
