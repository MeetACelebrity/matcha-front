import React from 'react';
import { useParams } from 'react-router-dom';
import useForm, { useFormField } from '../components/Form.jsx';

import LayoutSignOn from '../layouts/SignOn.jsx';

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
            label: 'Password',
            value: password,
            setValue: setPassword,
            isValid: isPasswordValid,
            setIsValid: setPasswordIsValid,
            min: 6,
        },
    ];

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    function onSubmit() {}

    return (
        <LayoutSignOn title="What is your password ?">
            pornhub {uuid} {token}
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValid}
            />
        </LayoutSignOn>
    );
}
