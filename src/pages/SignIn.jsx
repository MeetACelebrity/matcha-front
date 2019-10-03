import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';

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
            min: 6,
        },
    ];
    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    function onSubmit() {
        const apiUrl = 'http://e1r8p8.42.fr';
        const apiPort = '8080';
        const apiRoute = '/auth/sign-up';

        fetch(apiUrl + ':' + apiPort + apiRoute, {
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
        <section className="flex justify-center">
            <article className="flex justify-center flex-wrap w-64 mt-10">
                <h2 className="w-full text-center py-2 mx-6 my-3 text-gray-900 font-bold text-3xl font-title uppercase">
                    Sign in - {isValid ? 'valid' : 'not valid'}
                </h2>

                <FormComponent
                    onSubmit={onSubmit}
                    fields={fields}
                    isValid={isValid}
                />
            </article>
        </section>
    );
}
