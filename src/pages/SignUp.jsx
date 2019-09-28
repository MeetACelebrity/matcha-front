import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';

export default function SignUp() {

    function onSubmit(e) {
        const apiUrl = "http://e2r3p10.42.fr";
        const apiPort = "8080";
        const apiRoute = "/auth/sign-up";

        e.preventDefault();
        console.log(JSON.stringify(data));
        fetch(apiUrl + ':' + apiPort + apiRoute, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }


    /**
     * HOW TO ADD A FIELD ?
     *      1: add name of your field in the hooks
     *      2: add name of your field in "fields" array
     *      3: Add the text that will be print for yout field in "labelName"
     *      4: Done, you create a new field ready to send to the back
     */

    //hooks
    const [data, setData] = useState({ email: '', username: '', givenName: '', familyName: '', password: '' });

    //Field Generator
    const fields = ['email', 'username', 'givenName', 'familyName', 'password'];
    const labelNames = ['Email', 'Username', 'First Name', 'Last Name', 'Password']

    const listField = fields.map((fieldName) => {
        return (
            <FormField key={fieldName} labelName={labelNames[fields.indexOf(fieldName)]} name={fieldName} defaultValue={data[fieldName]} onChange={e => setData({ ...data, [fieldName]: e.target.value })
            } />
        );
    })

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
    )
}
