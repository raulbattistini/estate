import { connection } from "./db/connection";
import { Image } from "./models/Image";
import { FgPassMail } from "./models/FgPassMail";
import { Post } from "./models/Post";
import { Property } from "./models/Property";
import { User } from "./models/User";
import {NewsletterMail} from './models/NewsletterMail'

export const userRepository = connection.getRepository(User);

export const propertyRepository = connection.getRepository(Property);

export const imageRepository = connection.getRepository(Image);

export const fgPasswordRepository = connection.getRepository(FgPassMail);

export const postRepository = connection.getRepository(Post);

export const newsletterRepository = connection.getRepository(NewsletterMail);