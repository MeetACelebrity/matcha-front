import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';

import Input from './Input.jsx';

function isCorrectEmail(text) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(text) || 'This is not a correct email';
}

function isMaxRespected(maximum) {
    return text =>
        text.length < maximum ||
        `Don't exceed ${maximum} character${maximum > 1 ? 's' : ''}`;
}

function isMinRespected(minimum) {
    return text => {
        if (text.length >= minimum) return true;

        const subtext =
            minimum > 1 ? `characters are required` : `character is required`;

        return text.length >= minimum || `At least ${minimum} ${subtext}`;
    };
}

export default function TextField(props) {
    const [errors, setErrors] = useState([]);
    const [hasBeenUsed, setHasBeenUsed] = useState(false);

    const {
        value,
        email = false,
        max = -1,
        min = -1,
        lazy = true,
        isValid,
        setIsValid,
        setValue: setParentValue,
        triggerValidation,
        mask,
        label,
    } = props;

    function setValue(value) {
        if (hasBeenUsed === false) setHasBeenUsed(true);

        setParentValue(value);
    }

    useEffect(() => {
        const checkers = [];

        if (email === true) checkers.push(isCorrectEmail);

        if (max > -1) checkers.push(isMaxRespected(max));

        if (min > -1) checkers.push(isMinRespected(min));

        if (
            // If a validation has been requested explicitly
            triggerValidation === true ||
            // If the lazy mode has not been activated
            lazy !== true ||
            // If the string length is greater than 0
            value.length > 0 ||
            // ... or if the text-field has already been used
            hasBeenUsed === true
            // => validate the field
        ) {
            const checkersResult = checkers.map(checker => checker(value));

            setErrors(
                checkersResult.filter(value => typeof value === 'string')
            );

            setIsValid(checkersResult.every(entry => entry === true));
        }
    }, [
        value,
        email,
        lazy,
        max,
        min,
        setIsValid,
        hasBeenUsed,
        triggerValidation,
    ]);

    useEffect(() => {
        console.log('value from text field =', value);
    }, [value]);

    if (Array.isArray(mask)) {
        return (
            <MaskedInput
                mask={mask}
                label={label}
                isOk={isValid}
                errors={errors}
                setValue={setValue}
                render={(ref, maskedProps) => {
                    console.log('value from render fn', value);

                    return <Input ref={ref} {...maskedProps} />;
                }}
            />
        );
    }

    return (
        <Input {...props} isOk={isValid} errors={errors} setValue={setValue} />
    );
}
