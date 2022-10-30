import { instanceToPlain } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../helpers/hashPassword";
import { User } from "../models/User";
import { userRepository } from "../repositories";
import { UserService } from "../services/UserService";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, admin, password, intention, income, created_at } = req.body;

      const userService = new UserService();

      const user = await userService.createUser({
        name,
        email,
        admin,
        password,
        intention,
        income,
        created_at,
      });

      await userRepository.save(user);

      if (!user)
        return res.status(400).json({
          message: `Invalid body for user.`,
        });
      return res.status(201).json({
        message: `Created user with body:`,
        user,
      });
    } catch (error: any) {
      return next(error.message);
    }
  }

  async findById (req: Request, res: Response, next: NextFunction){

    try {

      const id = req.params.id
      
      const user = await userRepository.findOneBy({id})

      if (!user) return res.status(404).json({
        message: `No such user with id ${id}`
      });
      return res.status(200).json({
        user: user
      });
    
    } catch (error) {
    
      return next(error);
    
    }

  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userService = new UserService();

      const user = await userRepository.find({
        where: {email: email}
      });

      const token = await userService.authenticateUser({
        email,
        password,
      });

      if (!token) return res.status(401).json({
        message: "Invalid token"
      });

      return res.status(200).json({
        hash: `${token}`,
        user: instanceToPlain(user),
      });
    } catch (error: any) {
      return next(error.message);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();

      const users = await userService.getUsers();

      if (!users) return res.status(404);
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction){

    try {
      const { name, email, admin, password, intention, income } = req.body;

      const id = req.params.id;

      const userId = await userRepository.findOne({
        where: {
          id: (id),
        },
      });

      if(!userId){
        return res.status(400).json({
          message: "User does not exists!"
        })
      }

      const updateUser = await userRepository
      .createQueryBuilder()
      .update(User)
      .set({
          name: name,
          admin: false,
          email: email,
          password: hashPassword(password),
          income: income,
          intention: intention
      })
      .where("id = :id", { id: id })
      .execute();  

      return res.status(200).json({
        message: `The user: ${id} was sucessfully updated.`
      })
      
    } catch (error: any) {
      return next(error.message)
    }
  }
}
