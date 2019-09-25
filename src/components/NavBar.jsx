import React from 'react';
import classes from 'classnames';

import Button from './Button.jsx';

export default function NavBar() {
    const icons = [
        { to: '/', icon: 'search' },
        { to: '/', icon: 'message-circle' },
        { to: '/', icon: 'bell', showOnMobile: true },
    ];

    return (
        <header className="flex justify-between items-center px-6 py-2 bg-white shadow">
            <h1
                style={{ fontFamily: `'Saira', sans-serif` }}
                className="uppercase"
            >
                Meet A Celebrity
            </h1>

            <nav className="flex">
                {icons.map(({ to, icon, showOnMobile }, i) => (
                    <Button
                        key={icon}
                        to={to}
                        icon={icon}
                        outlined={false}
                        className={classes({
                            'ml-2': i !== 0,
                            hidden: showOnMobile !== true,
                            'md:block': showOnMobile !== true,
                        })}
                    />
                ))}
            </nav>
        </header>
    );
}
