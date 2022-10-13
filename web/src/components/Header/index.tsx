import React from "react";
import { Grid } from "@mui/material";
import {AiOutlineSearch} from 'react-icons/ai';

export const Header = () => {
  return (
    <div className="bg-[#046865] text-white text-3xl p-3 flex">
      <Grid container>
        <Grid item xs={6}>
          <h1 className="hover:text-[#21a0a0]">FL;RE - A Real Estate Website </h1>
        </Grid>
        <Grid item xs={6}>
          <div>
            <input
              type="text"
              className="rounded-md text-sm outline-0 self-end float-right text-end justify-end pr-12 h-8 p-2 mr-10 hover:bg-[#fcfff7]"
              placeholder="What you are looking for"
            />
            <AiOutlineSearch className="self-end float-right text-end justify-end ml-110 absolute text-black text-md"/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
