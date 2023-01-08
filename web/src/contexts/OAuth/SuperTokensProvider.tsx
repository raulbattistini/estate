import { createContext } from "react";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const SuperTokensContext = createContext<void>(null!);

export const SuperTokensProvider = ({ children }: { children: JSX.Element }) => {
  const value = SuperTokens.init({
    appInfo: {
      apiDomain: "http://localhost:4444",
      apiBasePath: "/",
      appName: "estate",
    },
    recipeList: [Session.init(), ThirdPartyEmailPassword.init()],
  });
  return <SuperTokensContext.Provider value={value}>{children}</SuperTokensContext.Provider>;
};
