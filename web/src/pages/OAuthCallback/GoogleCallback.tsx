import React, { useLayoutEffect } from "react";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { useNavigate } from "react-router-dom";

export const GoogleCallback = () => {
  const navigate = useNavigate();

  async function handleGoogleCallback() {
    try {
      const response = await thirdPartySignInAndUp();

      if (response.status === "OK") {
        console.log(response.user);
        if (response.createdNewUser) {
          navigate("/welcome");
        } else {
          navigate("/welcome");
        }
        window.location.assign("/home");
      } else {
        window.alert("No email provided by social login. Please use another form of login");
        window.location.assign("/login"); 
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        window.alert(err.message);
      } else {
        window.alert("Oopps... Something wrong happened here.");
      }
    }
  }
  useLayoutEffect(() => {
    handleGoogleCallback();
  }, []);

  return <div>GoogleCallback</div>;
};
