import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, SignIn, SignUp } from './pages';

export const RoutesEnum = {
    HOME: '/proposals',
    SEARCH: '/search',
    ME: '/me',
    USER: '/user',
    CHAT: '/chat',
    NOTIFICATIONS: '/notifications',

    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
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
    return (
        <Switch>
            <Route exact path={RoutesEnum.HOME} component={Home} />
            <Route path={RoutesEnum.SIGN_IN} component={SignIn} />
            <Route path={RoutesEnum.SIGN_UP} component={SignUp} />
        </Switch>
    );
}
