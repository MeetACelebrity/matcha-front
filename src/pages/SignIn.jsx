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
            name: 'username',
            autocomplete: 'username',
            value: username,
            setValue: setUsername,
            isValid: isUsernameValid,
            setIsValid: setUsernameIsValid,
            min: 1,
        },
        {
            label: 'Password',
            name: 'current-password',
            autocomplete: 'current-password',
            value: password,
            setValue: setPassword,
            isValid: isPasswordValid,
            setIsValid: setPasswordIsValid,
            type: 'password',
            min: 6,
        },
    ];

    const [isValidRef, FormComponent] = useForm({ fields, onSubmit });

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
        <LayoutSignOn title="Sign in">
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValidRef}
            />
        </LayoutSignOn>
    );
}
