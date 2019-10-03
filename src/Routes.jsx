import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
    Home,
    SignIn,
    SignUp,
    PasswordResetEmailAsking,
    PasswordResetPasswordAsking,
} from './pages';
import { AppContext } from './app-context';

export const RoutesEnum = {
    HOME: '/proposals',
    SEARCH: '/search',
    ME: '/me',
    USER: '/user',
    CHAT: '/chat',
    NOTIFICATIONS: '/notifications',

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

export default function Routes() {
    const {
        user: { loggedIn = false },
    } = useContext(AppContext);

    return (
        <main className="flex-1">
            {loggedIn ? (
                <Switch>
                    <Route exact path={RoutesEnum.HOME} component={Home} />
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
        </main>
    );
}
