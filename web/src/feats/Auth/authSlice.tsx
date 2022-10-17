import { createSlice } from "@reduxjs/toolkit";
import { IUserAuth } from "../../interfaces";

const authSlice = createSlice({
   name: "auth",
   initialState: {user: null, token: null},
   reducers: {
      setCredentials: (state, action) =>{
         const {user, accessToken} = action.payload
         state.user = user
         state.token = accessToken
      },
      logOut: (state) =>{
         state.user = null,
         state.token = null
      }
   }
})

export const {setCredentials, logOut} = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state: IUserAuth) => state.auth.user
export const selectCurrentToken = (state: IUserAuth) => state.auth.token
