import React from 'react';

import { API_ENDPOINT } from '../constants';
import useForm, { useFormField } from '../components/Form.jsx';
import LayoutSignOn from '../layouts/SignOn.jsx';

export default function SignUp() {
    const [email, setEmail, isEmailValid, setEmailIsValid] = useFormField('');
    const [
        username,
        setUsername,
        isUsernameValid,
        setUsernameIsValid,
    ] = useFormField('');
    const [
        givenName,
        setGivenName,
        isGivenNameValid,
        setGivenNameIsValid,
    ] = useFormField('');
    const [
        familyName,
        setFamilyName,
        isFamilyNameValid,
        setFamilyNameIsValid,
    ] = useFormField('');
    const [
        password,
        setPassword,
        isPasswordValid,
        setPasswordIsValid,
    ] = useFormField('');

    const fields = [
        {
            name: 'email',
            autocomplete: 'email',
            label: 'Email',
            value: email,
            setValue: setEmail,
            isValid: isEmailValid,
            setIsValid: setEmailIsValid,
            type: 'email',
            email: true,
        },
        {
            name: 'nickname',
            autocomplete: 'nickname',
            label: 'Username',
            value: username,
            setValue: setUsername,
            isValid: isUsernameValid,
            setIsValid: setUsernameIsValid,
            min: 1,
        },
        {
            name: 'given-name',
            autocomplete: 'given-name',
            label: 'First Name',
            value: givenName,
            setValue: setGivenName,
            isValid: isGivenNameValid,
            setIsValid: setGivenNameIsValid,
            min: 1,
        },
        {
            name: 'family-name',
            autocomplete: 'family-name',
            label: 'Last Name',
            value: familyName,
            setValue: setFamilyName,
            isValid: isFamilyNameValid,
            setIsValid: setFamilyNameIsValid,
            min: 1,
        },
        {
            name: 'new-password',
            autocomplete: 'new-password',
            label: 'Password',
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
        fetch(`${API_ENDPOINT}/auth/sign-up`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                username,
                givenName,
                familyName,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

    return (
        <LayoutSignOn title="Sign up">
            <FormComponent
                onSubmit={onSubmit}
                fields={fields}
                isValid={isValidRef}
            />
        </LayoutSignOn>
    );
}
