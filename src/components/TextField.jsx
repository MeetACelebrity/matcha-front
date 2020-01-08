import React, { useEffect, useState, useRef } from 'react';
import MaskedInput from 'react-text-mask';

import Input from './Input.jsx';
import { calculateAge } from '../constants.js';

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

function isValidDate(string) {
    return !Number.isNaN(+new Date(string)) || 'Invalid date';
}

function minYearsOf(minYears) {
    return string => {
        const date = new Date(string);

        if (Number.isNaN(+date)) {
            return 'Invalid date';
        }

        const years = calculateAge(date);
        if (Number.isNaN(years)) {
            return 'Invalid date';
        }
        if (years < minYears) {
            return `Invalid date : ${minYears} year(s) minimum`;
        }

        return true;
    };
}

export default function TextField(props) {
    const [errors, setErrors] = useState([]);
    const [hasBeenUsed, setHasBeenUsed] = useState(false);
    const inputRef = useRef(null);

    const {
        value,
        email = false,
        max = -1,
        min = -1,
        lazy = true,
        isValid,
        setIsValid,
        setValue: setParentValue,
        disableValidation,
        triggerValidation,
        mask,
        label,
        isDate,
        minYears,
    } = props;

    function setValue(value) {
        if (hasBeenUsed === false) setHasBeenUsed(true);

        if (typeof setParentValue === 'function') {
            setParentValue(value);
        }
    }

    useEffect(() => {
        if (disableValidation === true) return;

        const checkers = [];

        if (email === true) checkers.push(isCorrectEmail);

        if (max > -1) checkers.push(isMaxRespected(max));

        if (min > -1) checkers.push(isMinRespected(min));

        if (typeof minYears === 'number') checkers.push(minYearsOf(minYears));
        else if (isDate === true) checkers.push(isValidDate);

        if (
            // If a validation has been requested explicitly
            triggerValidation === true ||
            // If the lazy mode has not been activated
            lazy !== true ||
            // If the string length is greater than 0
            (value && value.length > 0) ||
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
        disableValidation,
        isDate,
        minYears,
    ]);

    if (Array.isArray(mask)) {
        return (
            <MaskedInput
                mask={mask}
                label={label}
                isOk={isValid}
                errors={errors}
                defaultValue={value}
                setValue={setValue}
                render={(ref, maskedProps) => {
                    inputRef.current = ref;

                    return <Input ref={ref} {...maskedProps} />;
                }}
            />
        );
    }

    return (
        <Input {...props} isOk={isValid} errors={errors} setValue={setValue} />
    );
}
