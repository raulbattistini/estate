import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { IAuthChildren } from "../../interfaces";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: IAuthChildren) => {
  useEffect(() => {
    myFunc();
  }, []);
  const myFunc = async () => {
    const authJwt = useContext(AuthContext);
    const navigate = useNavigate();
    const response = await thirdPartySignInAndUp();

    if (response.status === "OK") {
      console.log(response.user);
      if (response.createdNewUser) {
        return <Navigate to="/welcome" />;
      } else {
        return <Navigate to="/welcome" />;
      }
      return <Navigate to="/home" />;
    } else if (!authJwt.user) {
      return <Navigate to="/login" />;
    } else {
      toast.error("No email provided by social login. Please use another form of login");
      return <Navigate to="/login" />;
    }
  };

  return children;
};
