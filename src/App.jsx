import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';
import { AppContext } from './app-context.js';

const Container = styled.div`
    font-family: 'Roboto';

    ${tw`w-screen min-h-screen bg-gray-100 flex flex-col`}
`;

export default function App() {
    const [user, setUser] = useState({
        username: 'jen mich',
        loggedIn: false,
    });

    useEffect(() => {
        /*
            // fetch the api to know if the user is logged in ! :tada:

            const apiEndpoint = 'http://localhost:3000'

            fetch(`${apiEndpoint}/me`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then(user => setUser(user));
        */
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            <Router>
                <Container>
                    <NavBar />

                    <Routes />

                    <BottomBar />
                </Container>
            </Router>
        </AppContext.Provider>
    );
}
