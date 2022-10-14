import React from "react";
import { Grid } from "@mui/material";

export const Header = () => {
  return (
    <div className="bg-[#046865] text-white text-3xl p-3">
         <h1 className="hover:text-[#21a0a0] text-center">FL;RE - A Real Estate Website </h1>
        
        
        <Grid container className="pt-2 text-white">
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Blog</div>
          </Grid>
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Login</div>{" "}
          </Grid>
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Register </div>
          </Grid>
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Buy </div>
          </Grid>
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Sell </div>
          </Grid>
          <Grid item xs={2}>
            <div className="flex justify-center cursor-pointer text-lg"> Rent </div>
          </Grid>
        </Grid>
    </div>
  );
};
