import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Media from 'react-media';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import {
    Home,
    SignIn,
    SignUp,
    PasswordResetEmailAsking,
    PasswordResetPasswordAsking,
    UserProfile,
    UserProfileModify,
} from './pages';
import { AppContext } from './app-context';

export const RoutesEnum = {
    HOME: '/proposals',
    SEARCH: '/search',
    ME: '/me',
    USER: '/user',
    CHAT: '/chat',
    NOTIFICATIONS: '/notifications',
    ME_EDIT: '/me/edit',

    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD_EMAIL: '/reset-password/email',
    RESET_PASSWORD_PASSWORD: '/reset-password/password/:uuid/:token',
};

const RoutesMap = new Map([
    [RoutesEnum.HOME, { to: RoutesEnum.HOME, icon: 'home' }],
    [RoutesEnum.SEARCH, { to: RoutesEnum.SEARCH, icon: 'search' }],
    [RoutesEnum.CHAT, { to: RoutesEnum.CHAT, icon: 'message-circle' }],
    [
        RoutesEnum.NOTIFICATIONS,
        { to: RoutesEnum.NOTIFICATIONS, icon: 'bell', showOnMobile: true },
    ],
    [RoutesEnum.ME, { to: RoutesEnum.ME, icon: 'user' }],
    [RoutesEnum.USER, { to: RoutesEnum.USER }],
]);

export function mapRoutes(routes = []) {
    return routes.map(route => RoutesMap.get(route));
}

const Main = styled.main`
    ${tw`overflow-y-auto relative flex items-stretch`}

    min-height: calc(
        100vh - var(--nav-bar--height) - var(--bottom-bar--height)
    );

    > * {
        ${tw`min-h-full overflow-y-auto overflow-x-hidden`}
    }
`;

export default function Routes() {
    const {
        user: { loggedIn = false },
    } = useContext(AppContext);

    return (
        <Main>
            {loggedIn ? (
                <Switch>
                    {/**
                        When the width is less than 768px, me must separate HOME and ME routes.
                        On a large screen device, these both views are shown on HOME route.
                    */}
                    <Media query={{ maxWidth: 768 }}>
                        {screenIsSmall =>
                            screenIsSmall ? (
                                <>
                                    <Route
                                        path={RoutesEnum.HOME}
                                        component={Home}
                                    />
                                    <Route
                                        path={RoutesEnum.ME}
                                        component={UserProfile}
                                    />
                                </>
                            ) : (
                                <>
                                    <Route
                                        path={RoutesEnum.HOME}
                                        component={Home}
                                    />
                                    <Redirect
                                        exact
                                        from={RoutesEnum.ME}
                                        to={RoutesEnum.HOME}
                                    />
                                </>
                            )
                        }
                    </Media>

                    <Route
                        path={RoutesEnum.ME_EDIT}
                        component={UserProfileModify}
                    />
                    <Redirect from="/" to={RoutesEnum.HOME} />
                </Switch>
            ) : (
                <Switch>
                    <Route path={RoutesEnum.SIGN_IN} component={SignIn} />
                    <Route path={RoutesEnum.SIGN_UP} component={SignUp} />
                    <Route
                        path={RoutesEnum.RESET_PASSWORD_EMAIL}
                        component={PasswordResetEmailAsking}
                    />
                    <Route
                        path={RoutesEnum.RESET_PASSWORD_PASSWORD}
                        component={PasswordResetPasswordAsking}
                    />
                    <Redirect from="/" to={RoutesEnum.SIGN_UP} />
                </Switch>
            )}
        </Main>
    );
}
