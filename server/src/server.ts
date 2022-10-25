import express from "express";
import cors from 'cors';
import "dotenv/config";
import { connection } from "./db/connection";
import { routes } from "./routes";

const app = express();

const port = process.env.APP_PORT;

connection
  .initialize()
  .then(() => {
    console.log("Postgres database initialized");
    app.use(express.json());
    app.use(cors())
    app.use(routes);

  })
  .catch((error: any) => {
    console.log("Something wrong occurred: ", error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
