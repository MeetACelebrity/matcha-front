import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';
import { API_ENDPOINT, useIsMounted } from '../constants';

export default function PasswordResetPasswordAsking() {
    const { uuid, token } = useParams();

    const [redirect, setRedirect] = useState(false);
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
            type: 'password',
        },
    ];

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    const isMounted = useIsMounted();

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
            .then(({ statusCode }) => {
                if (!isMounted.current) return;

                if (statusCode === 'DONE') {
                    toast('You can log in using your new password', {
                        type: 'success',
                    });

                    setRedirect(true);
                    return;
                }

                const message =
                    statusCode === 'LINK_INCORRECT'
                        ? 'The link you followed is invalid'
                        : 'An error occured, try again later';

                toast(message, {
                    type: 'error',
                });
            })
            .catch(() => {
                toast('An error occured, try again later', {
                    type: 'error',
                });
            });
    }

    if (redirect) {
        return <Redirect to="/sign-in" />;
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
