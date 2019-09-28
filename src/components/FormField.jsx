import React from 'react';
import Input from './Input.jsx';


export default function FormField({ labelName, name, defaultValue, onChange, type = 'text', }) {

    const labelClass = 'block my-2 focus:shadow-outline';
    return (
        <div>
            <label className={labelClass} htmlFor={name + "-sign-up"}>
                {labelName}
            </label>
            <Input id={name + "-sign-up"} name={name} defaultValue={defaultValue} onChange={onChange} type={name === 'password' ? 'password' : type} />
        </div>
    )
}