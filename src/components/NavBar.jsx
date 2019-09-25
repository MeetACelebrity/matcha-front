import React from 'react';
import classes from 'classnames';
import { Link } from 'react-router-dom';

import Button from './Button.jsx';
import { mapRoutes, RoutesEnum } from '../Routes.jsx';

export default function NavBar() {
    const icons = mapRoutes([
        RoutesEnum.SEARCH,
        RoutesEnum.CHAT,
        RoutesEnum.NOTIFICATIONS,
    ]);

    return (
        <header className="flex justify-between items-center px-6 py-2 bg-white shadow">
            <Link to={RoutesEnum.HOME}>
                <h1 className="uppercase font-title">Meet A Celebrity</h1>
            </Link>

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
