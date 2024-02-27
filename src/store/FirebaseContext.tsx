import {  ReactNode, createContext, useState  } from "react";
import { FirebaseApp } from "firebase/app";


interface FirebaseType {
    firebase:FirebaseApp
} 

export const FirebaseContext = createContext<any | null>(null);

export const AuthContext = createContext<any | null>(null);

export interface ContextProps {
    children: ReactNode;
}

export default function Context ({children}:ContextProps) {
    const [user,setUser] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

