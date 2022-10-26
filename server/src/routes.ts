import { Router } from "express";
import multer from "multer";
import { ImageController } from "./controllers/ImageController";
import { MailController } from "./controllers/MailController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { uploadMiddleware } from "./middlewares/uploadMiddleware";

export const routes = Router();

const postController = new PostController();

const userController = new UserController();

const imageController = new ImageController()

// const mailController = new MailController();

// routes.post("/api/mails", mailController.sendMail);

routes.get("/api/posts", postController.get);

routes.get("/api/posts/:id", postController.getById);

routes.post("/api/posts", postController.post);

routes.put("/api/posts", postController.update);

routes.delete("/api/posts/:id", postController.deleteById);

routes.post("/api/users", userController.create);

routes.get("/api/users/", userController.listUsers);

routes.get("/api/users/:id", userController.findById);

routes.post("/api/tokens", userController.authenticate);

routes.get("/api/images", imageController.read);

routes.post("/api/images", multer(uploadMiddleware).single("image"), imageController.upload);

routes.delete("/api/images/:id", imageController.delete);