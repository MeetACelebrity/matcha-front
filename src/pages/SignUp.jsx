import React from 'react';

import Input from '../components/Input.jsx';

export default function SignUp() {
    function onSubmit(e) {
        console.log('submit');

        e.preventDefault();
    }
    const labelClass = 'block my-2 focus:shadow-outline';

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
                    <div>
                        <label
                            className={labelClass}
                            htmlFor="username-sign-up"
                        >
                            Username
                        </label>

                        <Input id="username-sign-up" />
                    </div>
                    <div>
                        <label
                            htmlFor="password-sign-up"
                            className={labelClass}
                        >
                            Password
                        </label>

                        <Input id="password-sign-up" type="password" />
                    </div>
                    <button type="submit">Sign up</button>
                </form>
            </article>
        </section>
    );
}
