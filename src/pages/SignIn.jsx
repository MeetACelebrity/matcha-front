import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';

export default function SignIn() {
    function onSubmit(e) {
        const apiUrl = 'http://e1r8p8.42.fr';
        const apiPort = '8080';
        const apiRoute = '/auth/sign-in';

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

    const [data, setData] = useState({ username: '', password: '' });
    const [valid, setValid] = useState({ username: true, password: true });

    const fields = ['username', 'password'];
    const labelNames = ['Username', 'Password'];

    function isValid(fieldName) {
        let validator;

        switch (fieldName) {
            case 'username':
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

    const listField = fields.map(fieldName => {
        return (
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
        );
    });

    return (
        <section className="flex justify-center">
            <article className="flex justify-center flex-wrap w-64 mt-10 shadow-xl rounded-lg bg-white">
                <h2 className="w-full text-center py-2 mx-6 my-3 border-b border-gray-400 text-gray-900 font-bold">
                    Sign In
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
