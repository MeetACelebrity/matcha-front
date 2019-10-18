import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';
import { AppContext } from './app-context.js';
// import { API_ENDPOINT } from './constants.js';

const Container = styled.div`
    font-family: 'Roboto';

    ${tw`w-screen h-screen overflow-x-hidden bg-gray-100`}

    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
`;

export default function App() {
    const [context, setContext] = useState({
        user: {},
        loggedIn: true,
    });

    useEffect(() => {
        // fetch the api to know if the user is logged in ! :tada:

        setTimeout(() => {
            setContext({
                user: { uuid: 'adfgadfg' },
                loggedIn: true,
            });
        }, 300);

        /*fetch(`${API_ENDPOINT}/me`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(user =>
                setUser({ user, loggedIn: user === null ? false : true })
            )
            .catch(console.error);
        */
    }, []);

    return (
        <AppContext.Provider value={{ context, setContext }}>
            <Router>
                <Container>
                    <NavBar />

                    <Routes />

                    {context.loggedIn && <BottomBar />}
                </Container>
            </Router>
        </AppContext.Provider>
    );
}
