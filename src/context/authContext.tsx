import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IAuthContext{
    login(token: string): void,
    token?: string,
    redirectRoute: string,
    children?: React.ReactNode 
}

interface IAuthContextProviderProps{
    children?: React.ReactNode 
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

export default function AuthContextProvider(props: IAuthContextProviderProps){

    const [token, setToken] = useLocalStorage<string>("token");
    const login = setToken;
    const redirectRoute = token ? "/" : "/login";

    return (
        <authContext.Provider
            value={{
                login,
                token,
                redirectRoute
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext); 