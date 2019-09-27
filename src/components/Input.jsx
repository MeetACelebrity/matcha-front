import React from 'react';
import classes from 'classnames';

export default function Input({
    id,
    value,
    label,
    onChange,
    className,
    type = 'text',
}) {
    const cssClasses = classes(
        'border-b-2 border-transparent focus:border-blue-500 mb-2 outline-none',
        className
    );

    return (
        <input
            id={id}
            type={type}
            label={label}
            value={value}
            onInput={onChange}
            className={cssClasses}
        />
    );
}
