import React, { useContext } from 'react';
import classes from 'classnames';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Button from './Button.jsx';
import { mapRoutes, RoutesEnum } from '../Routes.jsx';
import { AppContext } from '../app-context.js';

const Header = styled.header`
    ${tw`flex justify-between items-center px-6 py-2 bg-white shadow z-50`}
`;

export default function NavBar() {
    const icons = mapRoutes([
        RoutesEnum.SEARCH,
        RoutesEnum.CHAT,
        RoutesEnum.NOTIFICATIONS,
    ]);

    const {
        user: { loggedIn },
    } = useContext(AppContext);

    const homeLink = loggedIn ? RoutesEnum.HOME : RoutesEnum.SIGN_UP;

    return (
        <Header>
            <Link to={homeLink}>
                <h1 className="uppercase font-title">Meet A Celebrity</h1>
            </Link>

            <nav className="flex">
                {loggedIn ? (
                    icons.map(({ to, icon, showOnMobile }, i) => (
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
                    ))
                ) : (
                    <>
                        <Button to="/sign-in">Sign in</Button>
                        <Button to="/sign-up" className="ml-2">
                            Sign up
                        </Button>
                    </>
                )}
            </nav>
        </Header>
    );
}
