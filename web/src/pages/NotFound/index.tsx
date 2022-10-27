import { Link } from "react-router-dom";
import { BiBuoy } from "react-icons/bi";
import { Grid } from "@mui/material";

export const NotFound = () => {
  return (
    <div className="bg-[#046865] pb-5">
      <h1 className="text-center text-4xl text-white pt-5">404</h1>
      <Grid container className="text-center justify-center pt-5">
        {" "}
        <div className="flex flex-row">
          <BiBuoy className="text-white text-9xl justify-center flex text-center items-center" />
        </div>
      </Grid>
      <div className="flex text-center mt-5 text-2xl flex-col pb-5">
        <h3 className="text-white">
          Ooof! We found you! Accept this help and{" "}
        </h3>
        <Link to="/" className="text-white flex flex-col hover:text-[#a18276] underline">
          go back to home page
        </Link>
      </div>
      <div className="bg-[#c9c9c9]">
        <span>
          <Grid container className="text-white text-center pb-4 pt-4 text-xs">
            <Grid item xs={3} className="hover:text-[#046865] cursor-pointer">
              {" "}
              <div className="flex text-center justify-center"> </div> Terms of
              Service{" "}
            </Grid>
            <Grid item xs={3} className="hover:text-[#046865] cursor-pointer">
              {" "}
              Privacy Policy{" "}
            </Grid>
            <Grid item xs={3} className="hover:text-[#046865] cursor-pointer">
              {" "}
              Oficial Realtors of Florida{" "}
            </Grid>
            <Grid item xs={3} className="hover:text-[#046865] cursor-pointer">
              {" "}
              DMCA Notice{" "}
            </Grid>
          </Grid>
        </span>
      </div>
    </div>
  );
};
