import React from 'react';

import { API_ENDPOINT } from '../constants';
import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';

export default function SignUp() {
    const [
        username,
        setUsername,
        isUsernameValid,
        setUsernameIsValid,
    ] = useFormField('');
    const [
        password,
        setPassword,
        isPasswordValid,
        setPasswordIsValid,
    ] = useFormField('');

    const fields = [
        {
            label: 'Username',
            value: username,
            setValue: setUsername,
            isValid: isUsernameValid,
            setIsValid: setUsernameIsValid,
            min: 1,
        },
        {
            label: 'Password',
            value: password,
            setValue: setPassword,
            isValid: isPasswordValid,
            setIsValid: setPasswordIsValid,
            type: 'password',
            min: 6,
        },
    ];

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    function onSubmit() {
        fetch(`${API_ENDPOINT}/auth/sign-in`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

    return (
        <LayoutSignOn title={`Sign in - ${isValid ? 'valid' : 'not valid'}`}>
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValid}
            />
        </LayoutSignOn>
    );
}
