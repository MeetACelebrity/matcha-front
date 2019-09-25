import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import BottomBar from './components/BottomBar.jsx';
import Routes from './Routes.jsx';

function App() {
    return (
        <Router>
            <div>
                <NavBar />

                <Routes />

                <BottomBar />
            </div>
        </Router>
    );
}

export default App;
