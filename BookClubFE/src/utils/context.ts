import { createContext } from "react";
import { AuthContext } from "./types";

export const authContext = createContext<AuthContext>({auth: undefined, setAuth: undefined});