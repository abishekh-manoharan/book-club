import { createContext, useContext } from "react";
import { AuthContext } from "./types";

// AUTH CONTEXT
// auth context creation with undefined default value
export const authContext = createContext<AuthContext | undefined>(undefined);
// function that returns the context after ensuring that the context isn't undefined 
export const GetAuthContext = () => {
    const auth = useContext(authContext);
    if(auth !== undefined) {
        return auth;
    }
    throw new Error('auth context value not defined');
}