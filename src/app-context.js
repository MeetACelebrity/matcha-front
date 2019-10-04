import { createContext } from 'react';

export const AppContext = createContext({
    user: { uuid: null },
    setUser: () => {},
});
