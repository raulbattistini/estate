import express from "express";
import cors from "cors";
import "dotenv/config";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import { middleware } from "supertokens-node/framework/express";
import { connection } from "./db/connection";
import { routes } from "./routes";

const app = express();

// app.set("trust proxy", true);

const port = process.env.APP_PORT;

let { Google, Github, Facebook } = ThirdPartyEmailPassword;
let superTokensInitialization = async () =>
  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: "localhost:3567/dashboard",
      apiKey: process.env.FRONTEND_API_KEY
    },
    appInfo: {
      appName: "estate",
      apiDomain: process.env.API_DOMAIN as string,
      websiteDomain:  process.env.WEBSITE_DOMAIN as string,
      apiBasePath: "/",
      websiteBasePath: "/login",
    },
    recipeList: [
      ThirdPartyEmailPassword.init({
        providers: [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          }),
          Facebook({
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            clientId: process.env.FACEBOOK_APP_ID as string,
          }),
        ],
      }),
      Dashboard.init({
        apiKey: process.env.FRONTEND_API_KEY as string,
      }),
      Session.init(), // initializes session features
    ],
  });

connection
  .initialize()
  .then(() => {
    console.log("Postgres database initialized");
    app.use(express.json());
    superTokensInitialization();
    app.use(
      cors({
        origin: "http://localhost:5173",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
      })
    );
    app.use(routes);
    app.use(middleware());
  })
  .catch((error: any) => {
    console.log("Something wrong occurred: ", error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
