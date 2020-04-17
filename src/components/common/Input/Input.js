import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Input({ type, inputValue, touched, fieldName, onFieldChanged, onBlur }) {
    const hasError = touched && !inputValue;

    const fieldClasses = classnames({
        'c-field': true,
        'c-error': hasError
    });

    const handleFieldChanged = (e) => {
        onFieldChanged({ name: fieldName, value: e.target.value });
    };

    const handleBlur = () => {
        onBlur(fieldName);
    };

    return <div className={fieldClasses}>
        <label htmlFor={fieldName} className="c-label"> <strong> {fieldName}</strong></label>
        <input
            data-testid="custom-input"
            type={type}
            name={fieldName}
            min="0"
            className="c-input"
            onBlur={handleBlur}
            onChange={handleFieldChanged}
            value={inputValue}
        />
        {hasError && <span  data-testid="input-error" className="c-error"> Please fill in {type} for {fieldName} </span>}
    </div>
};

Input.propTypes = {
    fieldName: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number']).isRequired,
    inputValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    touched: PropTypes.bool.isRequired,
    onFieldChanged: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
};

export default memo(Input);
