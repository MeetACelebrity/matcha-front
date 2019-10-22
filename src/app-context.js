import { createContext } from 'react';

export const AppContext = createContext({
    context: { user: {}, loggedIn: false },
    setContext: () => {},
});
