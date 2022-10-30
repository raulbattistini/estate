import Multer from "multer";
import { Readable } from "typeorm/platform/PlatformTools";
export interface IUserAuth {
  email: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
  intention: string;
  income: string;
  created_at: Date;
}

export interface IUserUpdate {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
  intention: string;
  income: string;
}

export interface ISendService {
  to: string;
  subject: string;
  variables: object;
  path: string;
}

export interface ICallback {
   cb: (error: Error | null, destination: string) => void;
 }
 
 export interface File {
   /** Name of the form field associated with this file. */
   fieldname: string;
   /** Name of the file on the uploader's computer. */
   originalname: string;
   encoding: string;
   /** Value of the `Content-Type` header for this file. */
   mimetype: string;
   /** Size of the file in bytes. */
   size: number;
   /**
    * A readable stream of this file. Only available to the `_handleFile`
    * callback for custom `StorageEngine`s.
    */
   /** `DiskStorage` only: Directory to which this file has been uploaded. */
   destination: string;
   /** `DiskStorage` only: Name of this file within `destination`. */
   filename: string;
   /** `DiskStorage` only: Full path to the uploaded file. */
   path: string;
   /** `MemoryStorage` only: A Buffer containing the entire file. */
   buffer: Buffer;
 
   key: string;
 
   location: string;
 }