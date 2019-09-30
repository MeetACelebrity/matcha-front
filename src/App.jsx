import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';

const Container = styled.div`
    font-family: 'Roboto';

    ${tw`w-screen min-h-screen bg-gray-100 flex flex-col`}
`;

export default function App() {
    return (
        <Router>
            <Container>
                <NavBar />

                <Routes />

                <BottomBar />
            </Container>
        </Router>
    );
}
