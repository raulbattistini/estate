import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { IUserAuth, IAuthChildren } from "../../interfaces";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}: IAuthChildren) =>{
    const[user, setUser ] = useState<IUserAuth | null>(null);
    const api = useApi();

    useEffect(()=>{
        const validateToken = async() =>{
            const storageData = localStorage.getItem('authToken');
            if (storageData){
                const data = await api.validateToken(storageData);
                if (data.user){
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [api])

    const signin = async(email: string, password: string) =>{
        const data = await api.signin(email, password);
        if (data.user && data.hash){
            setUser(data.user);
            setToken(data.hash);
            return true;
        }
        return false
    }

    const signout = async () =>{
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = (token: string) =>{
        localStorage.setItem('authToken', token);
    }

    return <AuthContext.Provider value={{user, signin, signout}}>
            {children}
    </AuthContext.Provider>
    
}