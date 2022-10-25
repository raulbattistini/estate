import { Request, Response, NextFunction } from "express";
import { generateUUID } from "../helpers/generateUUID";
import { imageRepository } from "../repositories";

export class ImageController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      //  @ts-ignore
      const { originalname, size, key, location = "" } = req!.file;

      const post = await imageRepository.create({
        img_id: generateUUID(),
        originalname,
        location,
        key,
        size,
      });

      await imageRepository.save(post);

      return res.status(201).json(post);
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const all = await imageRepository.find({
        order: {
          size: "ASC",
        },
      });

      return res.status(200).json(all);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { img_id } = req.body;

      const photo = await imageRepository.findOneBy({ img_id });

      if (!photo)
        return res.status(404).json({
          message: `No such photo with id ${img_id}`,
        });
      await imageRepository.remove(photo);

      return res.end();
    } catch (error) {
      return next(error);
    }
  }
}
