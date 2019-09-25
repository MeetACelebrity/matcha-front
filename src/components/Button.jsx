import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'feather-icons-react';
import classes from 'classnames';

import '../styles/Button.css';

export default function Button({
    to,
    flat = false,
    outlined = true,
    icon,
    children,
    className,
}) {
    const cssClasses = classes(
        'button stroke-current rounded-full bg-white p-2 cursor-pointer',
        className,
        {
            'bg-gray-300': !flat,
            outlined: outlined,
        }
    );

    const child = icon ? <Icon icon={icon} /> : children;

    if (to === undefined) {
        return <button className={cssClasses}>{child}</button>;
    }

    return (
        <NavLink exact className={cssClasses} to={to}>
            {child}
        </NavLink>
    );
}
