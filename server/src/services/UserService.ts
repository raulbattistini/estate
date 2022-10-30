import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUserAuth, IUserCreate, IUserUpdate } from "../interfaces";
import { userRepository } from "../repositories";
import { instanceToPlain } from "class-transformer";
import { passwordCompareSync } from "../helpers/compareSync";
import { generateUUID } from "../helpers/generateUUID";
import { User } from "../models/User";
import { hashPassword } from "../helpers/hashPassword";

export class UserService {
  async authenticateUser({ email, password }: IUserAuth) {
    const user = await userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new Error("Try creating an account before you log in...");
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error("Password incorrect. Check your credentials and try again.");
    }

    const token = sign(
      {
        email: user.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }

  async getUsers() {
    const users = await userRepository.find();

    return instanceToPlain(users);
  }
  async createUser({ name, email, admin = false, password, intention, income, created_at }: IUserCreate) {
    if (!email) {
      throw new Error("Invalid body. Insert an email");
    }

    const userAlreadyExists = await userRepository.findOneBy({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("This email is already registered. Try logging in instead.");
    }

    const passwordHash = await hash(password, 12);

    const user = await userRepository.create({
      id: generateUUID(),
      name,
      email,
      admin,
      password: passwordHash,
      intention,
      income,
      created_at,
    });

    await userRepository.save(user);

    return user;
  }
}
