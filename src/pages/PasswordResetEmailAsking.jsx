import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';
import { API_ENDPOINT } from '../constants';

export default function PasswordResetEmailAsking() {
    const [email, setEmail, isEmailValid, setEmailIsValid] = useFormField('');

    const fields = [
        {
            label: 'Email',
            value: email,
            setValue: setEmail,
            isValid: isEmailValid,
            setIsValid: setEmailIsValid,
            email: true,
        },
    ];

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    function onSubmit() {
        fetch(`${API_ENDPOINT}/auth/reset-password/asking`, {
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

    return (
        <LayoutSignOn title="So, we forget password hey ?">
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValid}
            />
        </LayoutSignOn>
    );
}
