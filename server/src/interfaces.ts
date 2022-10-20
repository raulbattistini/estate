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