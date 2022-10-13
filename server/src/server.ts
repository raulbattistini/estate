import express from "express";
import "dotenv/config";
import { connection } from "./db/connection";

const app = express();

const port = process.env.APP_PORT;

connection
  .initialize()
  .then(() => {
    console.log("Postgres database initialized");
  })
  .catch((error: any) => {
    console.log("Something wrong occurred: ", error.message);
  });

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
