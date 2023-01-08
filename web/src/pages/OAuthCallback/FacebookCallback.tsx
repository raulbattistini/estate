import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import BarLoader from "react-spinners/BarLoader";

export const FacebookCallback = () => {
  
   useEffect(() => {
    handleFacebookCallback();
  }, []);
  
  let [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  async function handleFacebookCallback() {
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
  return (
    <div className="justify-center">
      <BarLoader
        color="#21a0a0"
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
