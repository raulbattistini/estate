import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import { UserService } from "../services/UserService";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, admin, password, created_at } = req.body;

      const userService = new UserService();

      const user = await userService.createUser({
        name,
        email,
        admin,
        password,
        created_at,
      });

      await userRepository.save(user);

      if (!user) return res.status(400).json({
         message: `Invalid body for user.`
      });
      return res.status(201).json({
         message: `Created user with body: ${user}`
      });
      
    } catch (error) {
      return next(error);
    }
  }
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userService = new UserService();

      const token = await userService.authenticateUser({
        email,
        password,
      });

      if (!token) return res.status(401);

      return res.status(200).json({
        message: `User with token ${token}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction){
   try {
      const userService = new UserService();

      const users = await userService.getUsers();

      if(!users) return res.status(404)
      return res.status(200).json(users);

   } catch (error) {
      return next(error);
   }
  } 
}
