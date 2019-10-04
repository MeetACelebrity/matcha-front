import React from 'react';
import { useParams } from 'react-router-dom';

import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';
import { API_ENDPOINT } from '../constants';

export default function PasswordResetPasswordAsking() {
    const { uuid, token } = useParams();

    const [
        password,
        setPassword,
        isPasswordValid,
        setPasswordIsValid,
    ] = useFormField('');

    const fields = [
        {
            label: 'New Password',
            value: password,
            setValue: setPassword,
            isValid: isPasswordValid,
            setIsValid: setPasswordIsValid,
            min: 6,
        },
    ];

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    function onSubmit() {
        fetch(`${API_ENDPOINT}/auth/reset-password/changing/`, {
            method: 'POST',
            body: JSON.stringify({
                uuid,
                token,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

    return (
        <LayoutSignOn title="But today... Is your lucky day">
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValid}
            />
        </LayoutSignOn>
    );
}
