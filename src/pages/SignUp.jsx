import React from 'react';

// import FormField from '../components/FormField.jsx';

import useForm, { useFormField } from '../components/Form.jsx';

export default function SignUp() {
    /**
     * TODO:
     *      1: create "flash message" for show error of api or if all good, ask user to check his mail
     *      2: implement validations function for check input (maybe we could reuse the api validator)
     *      3: Improve style
     *      4: Create link section bellow --> (sign-up, forgot password ...)
     */

    /**
     * HOW TO ADD A FIELD ?
     *      1: add name of your field in the hooks
     *      2: add name of your field in "fields" array
     *      3: Add the text that will be print for yout field in "labelName"
     *      4: Done, you create a new field ready to send to the back
     */

    //hooks
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
            label: 'Email',
            value: email,
            setValue: setEmail,
            isValid: isEmailValid,
            setIsValid: setEmailIsValid,
            email: true,
        },
        {
            label: 'Username',
            value: username,
            setValue: setUsername,
            isValid: isUsernameValid,
            setIsValid: setUsernameIsValid,
        },
        {
            label: 'First Name',
            value: givenName,
            setValue: setGivenName,
            isValid: isGivenNameValid,
            setIsValid: setGivenNameIsValid,
        },
        {
            label: 'Last Name',
            value: familyName,
            setValue: setFamilyName,
            isValid: isFamilyNameValid,
            setIsValid: setFamilyNameIsValid,
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

    function onSubmit(e) {
        const apiUrl = 'http://e1r8p8.42.fr';
        const apiPort = '8080';
        const apiRoute = '/auth/sign-up';

        e.preventDefault();

        fetch(apiUrl + ':' + apiPort + apiRoute, {
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

    const [isValid, FormComponent] = useForm({ fields, onSubmit });

    return (
        <section className="flex justify-center">
            <article className="flex justify-center flex-wrap w-64 mt-10">
                <h2 className="w-full text-center py-2 mx-6 my-3 text-gray-900 font-bold text-3xl font-title uppercase">
                    Sign Up - {isValid ? 'valid' : 'not valid'}
                </h2>

                <FormComponent />
            </article>
        </section>
    );
}
