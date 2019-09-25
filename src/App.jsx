import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';

function App() {
    return (
        <Router>
            <div className="w-screen min-h-screen bg-gray-100">
                <NavBar />

                <Routes />

                <BottomBar />
            </div>
        </Router>
    );
}

export default App;
