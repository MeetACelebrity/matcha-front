import React from 'react';

export default function SignUp() {
    function onSubmit(e) {
        console.log('submit');

        e.preventDefault();
    }

    return (
        <section className="flex justify-center">
            <article className="flex justify-center flex-wrap w-64 mt-10 shadow-xl rounded-lg bg-white">
                <h2 className="w-full text-center py-2 mx-6 border-b border-gray-400 text-gray-900 font-bold">
                    Sign Up
                </h2>
                <form
                    className="flex flex-col items-center pb-2"
                    onSubmit={onSubmit}
                >
                    <input type="text" />
                    <input type="password" />
                    <button type="submit">Sign up</button>
                </form>
            </article>
        </section>
    );
}
