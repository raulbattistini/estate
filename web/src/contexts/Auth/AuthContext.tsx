import { createContext } from 'react';
import { IUserAuth } from '../../interfaces';

export interface IAuthContext{
    user: IUserAuth | null;
    signin: (email: string, password: string) =>Promise<boolean>
    signout: ()=> void;
}

export const AuthContext = createContext<IAuthContext>(null!);