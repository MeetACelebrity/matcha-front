import { createContext } from 'react';

export const AppContext = createContext({
    context: { user: {}, loggedIn: false, pubsub: null, ws: null },
    setContext: () => {},
});
