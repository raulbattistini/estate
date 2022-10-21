export interface IUserAuth {
   email: string,
   password: string
}

export interface IUserRequest {
   name: string;
   email: string;
   admin?: boolean;
   password: string;
   created_at: Date
 }

export interface ISendService {
   to: string,
   subject: string,
   variables: object,
   path: string
}