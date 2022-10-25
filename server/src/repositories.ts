import { connection } from "./db/connection";
import { Image } from "./models/Image";
import { Mail } from "./models/Mail";
import { Post } from "./models/Post";
import { Property } from "./models/Property";
import { User } from "./models/User";

export const userRepository = connection.getRepository(User);

export const propertyRepository = connection.getRepository(Property);

export const imageRepository = connection.getRepository(Image);

export const mailRepository = connection.getRepository(Mail);

export const postRepository = connection.getRepository(Post);