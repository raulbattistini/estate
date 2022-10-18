import { useContext } from "react";
import { IAuthChildren } from "../../interfaces";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: IAuthChildren) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Login />;
    }

    return children;
}