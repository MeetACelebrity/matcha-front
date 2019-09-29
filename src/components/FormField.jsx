import React from 'react';
import Input from './Input.jsx';


export default function FormField({ labelName, name, defaultValue, onChange, type = 'text', isOk, }) {

    const labelClass = 'block my-2 focus:shadow-outline';

    return (
        <div>
            <label className={labelClass} htmlFor={name + "-sign-up"}>
                {labelName}
            </label>
            <Input id={name + "-sign-up"} isOk={isOk} name={name} defaultValue={defaultValue} onChange={onChange} type={name === 'password' || name === 'email' ? name : type} />
        </div>
    )
}