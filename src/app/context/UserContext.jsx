import { useState, createContext } from 'react'

const UserContext = createContext();
const mode = import.meta.env.VITE_MODE;
let urlBackend = '';
if (mode !== 'local') {
    urlBackend = import.meta.env.VITE_HOST_VERCEL;
}else{
    urlBackend = import.meta.env.VITE_HOST_LOCAL;
}

function UserProvider({ children }) {
    const [tokenSession, setTokenSession] = useState(null);

    return (
        <UserContext.Provider value={
            {
                tokenSession,
                setTokenSession,
                urlBackend
            }
        }>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider }


