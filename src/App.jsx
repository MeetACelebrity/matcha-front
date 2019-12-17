import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import RoamingModePopUp from './components/RoamingModePopUp.jsx';
import Routes from './Routes.jsx';
import { AppContext } from './app-context.js';
import { API_ENDPOINT, locateAndCompare, fetcher } from './constants.js';
import { useWS, useNotifications } from './ws.js';

const Container = styled.div`
    font-family: 'Roboto';

    ${tw`w-screen h-screen overflow-x-hidden bg-gray-100`}

    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
`;

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [context, setContext] = useState({
        user: {},
        loggedIn: false,
        wsPubsub: null,
        notificationsPubsub: null,
        ws: null,
        newDataConversations: false,
        newDataNotifications: false,
        notifications: [],
    });
    const [, launchWS, wsPubsub] = useWS();
    const [notificationsPubsub] = useNotifications();

    const onNewDataConversations = useCallback(type => {
        setContext(context => ({
            ...context,
            [type === 'conversations'
                ? 'newDataConversations'
                : 'newDataNotifications']: true,
        }));
    }, []);

    const pushNotification = useCallback(notification => {
        setContext(context => ({
            ...context,
            notifications: [
                ...context.notifications,
                {
                    ...notification,
                    createdAt: +new Date(),
                },
            ],
        }));
    }, []);

    useEffect(() => {
        // fetch the api to know if the user is logged in ! :tada:
        fetch(`${API_ENDPOINT}/me`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .catch(console.error)
            .then(user => {
                const loggedIn =
                    user === null || user === undefined ? false : true;

                setContext(context => ({
                    ...context,
                    user,
                    loggedIn,
                    wsPubsub,
                    notificationsPubsub,
                }));

                if (loggedIn === true) {
                    setContext(context => ({
                        ...context,
                        ws: launchWS(onNewDataConversations, pushNotification),
                    }));
                }

                return user;
            })
            .finally(() => {
                setLoaded(true);
            })
            .then(async user => {
                if (
                    user === null ||
                    user === undefined ||
                    !user.addresses ||
                    user.location === false ||
                    user.roaming === 'REFUSED'
                )
                    return;

                const officialAddress = user.addresses.find(
                    ({ type }) => type === 'PRIMARY'
                );
                if (officialAddress === null) return;

                const {
                    point: { x: lat, y: lng },
                } = officialAddress;

                try {
                    const {
                        canAskForRoamingMode,
                        coords,
                    } = await locateAndCompare({
                        lat,
                        lng,
                    });

                    console.log('can ask =', canAskForRoamingMode);

                    if (canAskForRoamingMode === false) return;

                    if (user.roaming !== 'ACCEPTED') {
                        toast(
                            <RoamingModePopUp
                                title="Activate the roaming mode ?"
                                text="Thanks to the roaming mode you will always get results according to your current position."
                                onConfirm={activateRoamingMode(coords)}
                            />,
                            {
                                autoClose: false,
                                closeOnClick: false,
                            }
                        );
                    } else {
                        activateRoamingMode({
                            ...coords,
                            mustSetRoamingMode: false,
                        })(true);
                    }
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(console.error);
    }, [launchWS, notificationsPubsub, onNewDataConversations, pushNotification, setLoaded, wsPubsub]);

    useEffect(() => {
        fetch(`${API_ENDPOINT}/user/notif/get`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(notifications => {
                if (!Array.isArray(notifications)) return;

                const newDataNotifications = notifications.reduce(
                    (agg, { seen }) => {
                        if (agg === true || seen === false) return true;

                        return false;
                    },
                    false
                );

                setContext(context => ({
                    ...context,
                    notifications,
                    newDataNotifications,
                }));
            })
            .catch(console.error);
    }, []);

    function activateRoamingMode({
        latitude: lat,
        longitude: long,
        mustSetRoamingMode = true,
    }) {
        return async state => {
            try {
                let requests = [];

                if (mustSetRoamingMode === true) {
                    requests.push([
                        'profile/roaming',
                        {
                            credentials: 'include',
                            method: 'PUT',
                            body: {
                                value: state === true ? 'ACCEPTED' : 'REFUSED',
                            },
                            json: true,
                        },
                    ]);
                } else if (state === true) {
                    // delete the *current* address
                    requests.push([
                        'profile/address/delete',
                        {
                            crendentials: 'include',
                            method: 'DELETE',
                            body: {},
                            json: true,
                        },
                    ]);
                }

                if (state === true) {
                    requests.push([
                        'profile/address',
                        {
                            credentials: 'include',
                            method: 'PUT',
                            body: { lat, long, isPrimary: false, auto: true },
                            json: true,
                        },
                    ]);
                }

                await Promise.all(
                    requests.map(([url, body]) =>
                        fetcher(`${API_ENDPOINT}/${url}`, body)
                    )
                );
            } catch (e) {
                console.error(e);
            }
        };
    }

    return (
        <AppContext.Provider value={{ context, setContext }}>
            <Router>
                <Container>
                    <NavBar />

                    <Routes loaded={loaded} />

                    {context.loggedIn && <BottomBar />}

                    <ToastContainer />

                    <div id="modals-container" />
                </Container>
            </Router>
        </AppContext.Provider>
    );
}
