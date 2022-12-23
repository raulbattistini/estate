import { useState } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useInView, InView } from "react-intersection-observer";
import { AdminSection } from "../Admin";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: "0px",
    threshold: 1,
    initialInView: true,
    delay: 10,
  });
  return (
    <>
      {!inView && (
        <section className="top-0 sticky z-30">
          <div className="bg-sea-green-rgba text-white text-3xl pb-3 top-0 lazy pt-3">
            <h1 className="hover:text-[#21a0a0] text-center" title="We are a real estate agency based in Orlando, FL.">
              <Link to="/"> FL;RE - A Real Estate Website </Link>
            </h1>
            <Grid container className="pt-2 text-white">
              <Grid item xs={2}>
                <Link to="/blog" className="hover:text-[#a18276]">
                  <div className="flex justify-center cursor-pointer text-lg"> Blog</div>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/login" className="hover:text-[#a18276]">
                  {" "}
                  <div className="flex justify-center cursor-pointer text-lg"> Login</div>
                </Link>{" "}
              </Grid>
              <Grid item xs={2}>
                <Link to="/register-user" className="hover:text-[#a18276]">
                  {" "}
                  <div className="flex justify-center cursor-pointer text-lg"> Register </div>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/buy" className="hover:text-[#a18276]">
                  {" "}
                  <div className="flex justify-center cursor-pointer text-lg"> Buy </div>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/sell" className="hover:text-[#a18276]">
                  {" "}
                  <div className="flex justify-center cursor-pointer text-lg"> Sell </div>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/rent" className="hover:text-[#a18276]">
                  {" "}
                  <div className="flex justify-center cursor-pointer text-lg"> Rent </div>
                </Link>
              </Grid>
            </Grid>
          </div>
        </section>
      )}
      <section className="default top" ref={ref}>
        <AdminSection />
        <div className="bg-[#046865] text-white text-3xl pb-3">
          <h1
            className="hover:text-[#21a0a0] text-center"
            title="We are a real estate agency based in Orlando, FL."
          >
            <Link to="/"> FL;RE - A Real Estate Website </Link>
          </h1>
          <Grid container className="pt-2 text-white">
            <Grid item xs={2}>
              <Link to="/blog" className="hover:text-[#a18276]">
                <div className="flex justify-center cursor-pointer text-lg"> Blog</div>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/login" className="hover:text-[#a18276]">
                {" "}
                <div className="flex justify-center cursor-pointer text-lg"> Login</div>
              </Link>{" "}
            </Grid>
            <Grid item xs={2}>
              <Link to="/register-user" className="hover:text-[#a18276]">
                {" "}
                <div className="flex justify-center cursor-pointer text-lg"> Register </div>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/buy" className="hover:text-[#a18276]">
                {" "}
                <div className="flex justify-center cursor-pointer text-lg"> Buy </div>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/sell" className="hover:text-[#a18276]">
                {" "}
                <div className="flex justify-center cursor-pointer text-lg"> Sell </div>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/rent" className="hover:text-[#a18276]">
                {" "}
                <div className="flex justify-center cursor-pointer text-lg"> Rent </div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};
