import React from 'react';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

export const LocationMask = React.forwardRef(function LocationMask(props, ref) {

    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="##0000000000"
            definitions={{
                '#': /[A-Z]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { value } })}
            overwrite
        />
    );
});
  
LocationMask.propTypes = {
    onChange: PropTypes.func.isRequired,
};
