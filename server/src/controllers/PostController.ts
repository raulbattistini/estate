import { Request, Response, NextFunction } from "express";
import { generateUUID } from "../helpers/generateUUID";
import { Post } from "../models/Post";
import { postRepository } from "../repositories";

export class PostController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postRepository.find();

      if (!posts)
        return res.status(404).json({
          message: `There were no posts found.`,
        });
      return res.status(200).json({
        posts
      });
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postRepository.findOne({
        where: { post_id: req.params.id },
      });
      if (!post)
        return res.status(404).json({
          message: `Post with id ${req.params.id} doesn't exist. Try searching for another.`,
        });
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, title, created_at } = req.body as Post;

      const post = postRepository.create({
        post_id: generateUUID(),
        title,
        content,
        created_at,
      });

      await postRepository.save(post);

      return res.status(201).json({
        message: post,
      });
    } catch (error) {
      return next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postRepository.findOne({
        where: { post_id: req.params.id },
      });

      if (!post)
        return res.status(404).json({
          message: `There was no such post with id ${req.params.id}`,
        });
      await postRepository.remove(post);

      return res.end();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
   try {
     const { title, content, created_at } = req.body;

     const postExists = await postRepository.findOne({
       where: { post_id: req.params.id },
     });
     if (!postExists)
       return res.status(404).json({
         message: `Post with id ${req.params.id} doesn't exist. Try searching another.`,
       });
     await postRepository
       .createQueryBuilder()
       .update(Post)
       .set({
         post_id: req.params.id,
         title: title,
         content: content,
         created_at: created_at
       })
       .where("post_id = :post_id", { post_id: req.params.id })
       .execute();

     return res.status(200).json({
       message: `Post with id ${req.params.id} was updated successfully`,
     });
   } catch (error) {
     return next(error);
   }
 }
}
