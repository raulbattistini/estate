import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../models/User";
import { Property } from "../models/Property";
import { Image } from "../models/Image";
import { Mail } from "../models/Mail";
import { Post } from "../models/Post";

export const connection = new DataSource({
  type: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  entities: [User, Property, Image, Mail, Post],
  migrations: ["./db/migrations/"],
  synchronize: true,
});
