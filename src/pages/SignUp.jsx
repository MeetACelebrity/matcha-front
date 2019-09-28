import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';


export default function SignUp() {
    function onSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(data));
        console.log(data);
    }


    //hooks
    const [data, setData] = useState({ email: '', username: '', givenName: '', familyName: '', password: '' });


    //Field Generator
    const field = ['email', 'username', 'givenName', 'familyName', 'password'];

    const listField = field.map((fieldName) => {
        return (
            <FormField key={fieldName} labelName={fieldName} name={fieldName} defaultValue={data[fieldName]} onChange={e => setData({ ...data, [fieldName]: e.target.value })
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

    );
}
