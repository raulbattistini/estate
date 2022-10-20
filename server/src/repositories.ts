import { connection } from "./db/connection";
import { Image } from "./models/Image";
import { Property } from "./models/Property";
import { User } from "./models/User";

export const userRepository = connection.getRepository(User);

export const propertyRepository = connection.getRepository(Property);

export const imageRepository = connection.getRepository(Image);