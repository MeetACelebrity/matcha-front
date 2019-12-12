import { createContext } from 'react';

export const AppContext = createContext({
    context: {
        user: {},
        loggedIn: false,
        wsPubsub: null,
        notificationsPubsub: null,
        ws: null,
    },
    setContext: () => {},
});
