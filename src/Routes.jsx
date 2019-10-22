import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Media from 'react-media';
import styled, { keyframes, css } from 'styled-components';
import tw from 'tailwind.macro';
import { Transition } from 'react-transition-group';

import {
    Home,
    SignIn,
    SignUp,
    PasswordResetEmailAsking,
    PasswordResetPasswordAsking,
    UserProfile,
    UserProfileModify,
    Profile,
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
    PROFILE: '/profile/:uuid',

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

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const SpinnerContainerCss = tw`opacity-0`;

const SpinnerContainer = styled.div`
    --transition-duration: 300ms;
    --transition-delay: 1000ms;

    ${tw`absolute inset-0 flex justify-center items-center bg-white opacity-100 z-40`}

    transition: opacity var(--transition-duration) var(--transition-delay);

    ${({ fadeOut }) => fadeOut && SpinnerContainerCss}
    ${({ hide }) =>
        hide &&
        css`
            ${tw`hidden`}
        `}
`;

const Spinner = styled.div`
    &::after {
        ${tw`block`}

        content: '';
        width: 64px;
        height: 64px;
        margin: 1px;
        border-radius: 50%;
        border: 10px solid #2a4365;
        border-color: #2a4365 transparent #2a4365 transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`;

export default function Routes({ loaded = false }) {
    const {
        context: { loggedIn = false },
    } = useContext(AppContext);

    return (
        <Main>
            <Transition in={!loaded} timeout={1300}>
                {state => (
                    <SpinnerContainer
                        fadeOut={['exiting', 'exited'].includes(state)}
                        hide={state === 'exited'}
                    >
                        <Spinner />
                    </SpinnerContainer>
                )}
            </Transition>

            {/**
                When the width is less than 768px, me must separate HOME and ME routes.
                On a large screen device, these both views are shown on HOME route.
            */}
            {loaded &&
                (loggedIn ? (
                    <Switch>
                        <Route
                            path={RoutesEnum.ME_EDIT}
                            component={UserProfileModify}
                        />
                        <Route path={RoutesEnum.PROFILE} component={Profile} />

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
                ))}
        </Main>
    );
}
