import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import { AppContext } from '../app-context.js';
import { useWS } from '../ws.js';
import { API_ENDPOINT, SIGN_IN_MESSAGES } from '../constants';
import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';

export default function SignUp() {
    const [, launchWS] = useWS();
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
    const { setContext } = useContext(AppContext);

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
            .then(({ statusCode, user }) => {
                const isError = statusCode !== 'DONE';
                const message = SIGN_IN_MESSAGES.get(statusCode);

                toast(message, {
                    type: isError === true ? 'error' : 'success',
                });

                if (isError === false) {
                    setContext(context => ({
                        ...context,
                        user,
                        loggedIn: true,
                        ws: launchWS(
                            type => {
                                setContext(context => ({
                                    ...context,
                                    [type === 'conversations'
                                        ? 'newDataConversations'
                                        : 'newDataNotifications']: true,
                                }));
                            },
                            notification => {
                                setContext(context => ({
                                    ...context,
                                    notifications: [
                                        ...context.notifications,
                                        notification
                                    ],
                                }));
                            }
                        ),
                    }));
                }
            })
            .catch(console.error);
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
