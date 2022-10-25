import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { IAuthChildren } from "../../interfaces";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: IAuthChildren) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Navigate to="/login"/>;
    }

    return children;
}