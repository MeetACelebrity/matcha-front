import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';

export default function SignUp() {
    function onSubmit(e) {
        const apiUrl = 'http://e1r8p8.42.fr';
        const apiPort = '8080';
        const apiRoute = '/auth/sign-up';

        e.preventDefault();

        fetch(apiUrl + ':' + apiPort + apiRoute, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

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
    const [data, setData] = useState({
        email: '',
        username: '',
        givenName: '',
        familyName: '',
        password: '',
    });
    const [valid, setValid] = useState({
        email: true,
        username: true,
        givenName: true,
        familyName: true,
        password: true,
    });

    //Field Generator
    const fields = ['email', 'username', 'givenName', 'familyName', 'password'];
    const labelNames = [
        'Email',
        'Username',
        'First Name',
        'Last Name',
        'Password',
    ];

    //implement here validation function that we want (need to return true if it's valid, or the oposit if isn't)
    function isValid(fieldName) {
        let validator;

        switch (fieldName) {
            case 'email':
                validator = false;
                break;
            case 'password':
                validator = false;
                break;
            default:
                validator = true;
        }
        setValid({ ...valid, [fieldName]: validator });
    }

    const listField = fields.map(fieldName => (
        <FormField
            key={fieldName}
            isOk={valid[fieldName]}
            labelName={labelNames[fields.indexOf(fieldName)]}
            name={fieldName}
            defaultValue={data[fieldName]}
            onChange={e => {
                isValid(fieldName);
                setData({ ...data, [fieldName]: e.target.value });
            }}
        />
    ));

    return (
        <section className="flex justify-center">
            <article className="flex justify-center flex-wrap w-64 mt-10 shadow-xl rounded-lg bg-white">
                <h2 className="w-full text-center py-2 mx-6 my-3 border-b border-gray-400 text-gray-900 font-bold">
                    Sign Up
                </h2>

                <form
                    className="flex flex-col items-center pb-2"
                    onSubmit={onSubmit}
                >
                    {listField}
                    <button type="submit">Sign up</button>
                </form>
            </article>
        </section>
    );
}
