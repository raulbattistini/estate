import { Request, Response, NextFunction } from "express";
import { imageRepository } from "../repositories";

export class PhotoController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const duplicate = await imageRepository.findOne({
         where: {
            img_id: req.params.img_id
         }
      })

      if (duplicate) return res.status(409).json({
         message: `There is an image already registered with this id.`
      })
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const all = await imageRepository.find({
         order: {
            size: "ASC"
         }
      })

      return res.status(200).json(all);
    } catch (error) {
      return next(error);
    }
  }
  
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {img_id} = req.body;

      const photo = await imageRepository.findOneBy({img_id})
      
      if(!photo) return res.status(404).json({
         message: `No such photo with id ${img_id}`
      })
      await imageRepository.remove(photo);

      return res.end();
   } catch (error) {
      return next(error);
    }
  }
}