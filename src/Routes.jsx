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
    Profile,
    NotFound,
    MyLovers,
    MyVisitors,
    Search,
    Notifications,
    ChatList,
    ChatConversation,
    ChatMasterView,
} from './pages';
import { AppContext } from './app-context';
import Spinner from './components/Spinner.jsx';

export const RoutesEnum = {
    HOME: '/proposals',
    SEARCH: '/search',
    ME: '/me',
    USER: '/user',
    CHAT: '/chat',
    NOTIFICATIONS: '/notifications',
    ME_EDIT: '/me/edit',
    PROFILE: '/profile/:uuid',
    MY_VISITORS: '/my-visitors',
    MY_LOVERS: '/my-lovers',

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
    ${tw`h-full overflow-y-auto relative`}

    min-height: calc(
        100vh - var(--nav-bar--height) - var(--bottom-bar--height)
    );

    > * {
        ${tw`min-h-full overflow-y-auto overflow-x-hidden`}
    }
`;

export default function Routes({ loaded = false }) {
    const {
        context: { loggedIn = false },
    } = useContext(AppContext);

    return (
        <Main>
            <Spinner in={!loaded} timeout={1300} />

            {/**
                When the width is less than 768px, me must separate HOME and ME routes.
                On a large screen device, these both views are shown on HOME route.
            */}
            {loaded &&
                (loggedIn ? (
                    <Media query={{ maxWidth: 768 }}>
                        {screenIsSmall => {
                            const template = (children, before = null) => (
                                <Switch>
                                    <Redirect exact path="/" to={RoutesEnum.HOME} />
                                    <Redirect
                                        path={RoutesEnum.SIGN_IN}
                                        to={RoutesEnum.HOME}
                                    />
                                    <Redirect
                                        path={RoutesEnum.SIGN_UP}
                                        to={RoutesEnum.HOME}
                                    />
                                    <Redirect
                                        path={RoutesEnum.RESET_PASSWORD_EMAIL}
                                        to={RoutesEnum.HOME}
                                    />
                                    <Redirect
                                        path={
                                            RoutesEnum.RESET_PASSWORD_PASSWORD
                                        }
                                        to={RoutesEnum.HOME}
                                    />
                                    {before}

                                    <Route
                                        path={RoutesEnum.HOME}
                                        component={Home}
                                    />
                                    <Route
                                        path={RoutesEnum.ME_EDIT}
                                        component={UserProfileModify}
                                    />
                                    <Route
                                        path={RoutesEnum.PROFILE}
                                        component={Profile}
                                    />
                                    <Route
                                        path={RoutesEnum.SEARCH}
                                        component={Search}
                                    />
                                    <Route
                                        path={RoutesEnum.NOTIFICATIONS}
                                        component={Notifications}
                                    />
                                    <Route
                                        path={RoutesEnum.MY_LOVERS}
                                        component={MyLovers}
                                    />
                                    <Route
                                        path={RoutesEnum.MY_VISITORS}
                                        component={MyVisitors}
                                    />

                                    {children}

                                    <Route path="/404" component={NotFound} />
                                    <Redirect from="/" to="/404" />
                                </Switch>
                            );

                            return template(
                                screenIsSmall ? (
                                    <>
                                        <Route
                                            path={RoutesEnum.ME}
                                            component={UserProfile}
                                        />
                                        <Route
                                            path="/chat"
                                            exact
                                            component={ChatList}
                                        />
                                        <Route
                                            path="/chat/:uuid"
                                            exact
                                            component={ChatConversation}
                                        />
                                    </>
                                ) : (
                                    <Route
                                        path="/chat/:uuid?"
                                        component={ChatMasterView}
                                    />
                                ),
                                screenIsSmall ? null : (
                                    <Redirect
                                        exact
                                        from={RoutesEnum.ME}
                                        to={RoutesEnum.HOME}
                                    />
                                )
                            );
                        }}
                    </Media>
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

                        <Route path="/404" component={NotFound} />
                        <Redirect from="/" to="/404" />
                    </Switch>
                ))}
        </Main>
    );
}
