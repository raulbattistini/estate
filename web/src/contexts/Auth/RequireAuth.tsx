import { useContext } from "react";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";
import { IAuthChildren } from "../../interfaces";

export const RequireAuth = ({ children }: IAuthChildren) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return Login;
  } else {
    return children;
  }
};
