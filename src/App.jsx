import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';

import styled from 'styled-components';
import tw from 'tailwind.macro';

const Button = styled.button`
    ${tw`w-64 bg-blue-700`}

    ${props => props.hover && tw`bg-blue-300`}
`;

export default function App() {
    return (
        <Router>
            <div className="w-screen min-h-screen bg-gray-100">
                <NavBar />
                <Button>TailwindCSS</Button>

                <Routes />

                <BottomBar />
            </div>
        </Router>
    );
}
