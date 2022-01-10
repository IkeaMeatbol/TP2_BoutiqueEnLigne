import {createContext, useContext} from "react";

export const ContextAuth = createContext();

export function UtiliseAuth() {
    return useContext(ContextAuth);
}
