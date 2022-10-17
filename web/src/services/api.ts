import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import "dotenv/config";
import { logOut, setCredentials } from "../feats/Auth/authSlice";
import { BaseQueryApi, IGetState } from "../interfaces";

const url = process.env.API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  prepareHeaders: (headers, { getState }: IGetState) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string, api: BaseQueryApi, extraOptions: {}) =>{
   let result = await baseQuery(args, api, extraOptions);

   if (result?.error?.status === 403){
      console.log("refresh token being sent");

      const refreshResult = await baseQuery('/api/refreshToken', api, extraOptions);
      console.log(refreshResult);

      if (refreshResult.data){
         const user = api.getState().auth.user

         api.dispatch(setCredentials({ ...refreshResult.data, user}));
      } else {
         api.dispatch(logOut());
      }
   }

   return result;
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({})
})