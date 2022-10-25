import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { File } from "../interfaces";

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/pjpeg" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/gif"
  ) {
    callback(null, true);
  } else {
    callback(
      new Error("Image type not supported. Choose either png, jpg, jpeg, svg or gif file extensions up to 2MB."),
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, "");

      file.key = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, file.key);
    });
  },
});

export const uploadMiddleware = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),

  storage: storage,

  fileFilter: fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
