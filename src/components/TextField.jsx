import React, { useEffect, useState } from 'react';

import Input from './Input.jsx';

function isCorrectEmail(text) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(text) || 'This is not a correct email';
}

function isMaxRespected(maximum) {
    return text =>
        text.length < maximum || `Don't exceed ${maximum} characters`;
}

function isMinRespected(minimum) {
    return text =>
        text.length >= minimum || `At least ${minimum} characters are required`;
}

export default function TextField(props) {
    const [errors, setErrors] = useState([]);

    const {
        value,
        email = false,
        max = -1,
        min = -1,
        lazy = true,
        isValid,
        setIsValid,
    } = props;

    useEffect(() => {
        const checkers = [];

        if (email === true) checkers.push(isCorrectEmail);

        if (max > -1) checkers.push(isMaxRespected(max));

        if (min > -1) checkers.push(isMinRespected(min));

        if (lazy !== true || value.length > 0) {
            const checkersResult = checkers.map(checker => checker(value));

            setErrors(
                checkersResult.filter(value => typeof value === 'string')
            );

            setIsValid(checkersResult.every(entry => entry === true));
        }
    }, [value, email, lazy, max, min, setIsValid]);

    return <Input {...props} isOk={isValid} errors={errors} />;
}
