import { Router } from "express";
import multer from "multer";
import { ForgotPasswordController } from "./controllers/FgPassMailController";
import { ImageController } from "./controllers/ImageController";
import { NewsletterMailController } from "./controllers/NewsletterMailController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { uploadMiddleware } from "./middlewares/uploadMiddleware";

export const routes = Router();

const postController = new PostController();

const userController = new UserController();

const imageController = new ImageController()

const newsletterMailController = new NewsletterMailController();

const fgPassword = new ForgotPasswordController();

routes.post("/api/mails/newsletter", newsletterMailController.sendMail);

// routes.post("/api/mails/forgot-password", fgPassword.sendMail);

routes.post("/api/mails/test", fgPassword.sendForgotPassMail);

routes.get("/api/posts", postController.get);

routes.get("/api/posts/:id", postController.getById);

routes.post("/api/admin/posts", postController.post);

routes.put("/api/admin/posts/:id", postController.update);

routes.delete("/api/admin/posts/:id", postController.deleteById);

routes.post("/api/users", userController.create);

routes.get("/api/users/", userController.listUsers);

routes.get("/api/users/:id", userController.findById);

routes.post("/api/tokens", userController.authenticate);

routes.put("/api/users/:id", userController.updateUser);

routes.get("/api/images", imageController.read);

routes.post("/api/admin/images", multer(uploadMiddleware).single("image"), imageController.upload);

routes.delete("/api/admin/images/:id", imageController.delete);