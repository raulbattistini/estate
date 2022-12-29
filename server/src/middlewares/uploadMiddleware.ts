import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/pjpeg" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "application/pdf"
  ) {
    callback(null, true);
  } else {
    throw new Error(
      "File type not supported. Choose either png, jpg, jpeg, svg, gif or pdf file extensions up to 2MB."
    );
  }
};

export const storageMiddleware = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(10, (err, hash) => {
      if (err) cb(err, "");

      const date = new Date().getTime();

      file.fieldname = `${date}-${file.originalname}`;

      cb(null, file.fieldname);
    });
  },
});

export const uploadMiddleware = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),

  storage: storageMiddleware,

  fileFilter: fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
