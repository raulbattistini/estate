import { Grid } from "@mui/material";
import { AiFillYoutube } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="bg-[#046865] w-full">
      <div className="block text-center">
        <span className="flex justify-center text-3xl text-white pt-5">
          {" "}
          Want to know the current value of your home?
        </span>
        <input
          type="text"
          className="w-60 p-2 rounded-sm mt-3 outline-0"
          placeholder="Type your email"
        />
        <button className="bg-[#a18276] ml-5 rounded-sm p-2 text-white">
          {" "}
          Check it{" "}
        </button>
      </div>
      <div className="pt-5 self-center">
        <span className="flex justify-center text-white text-3xl">
          {" "}
          Where we are located{" "}
        </span>
        <div className="flex justify-center rounded-md pt-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.54325527028!2d-81.34266519999998!3d28.4811732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fecdbc77%3A0xac3b2063ca5bf9e!2sOrlando%2C%20FL%2C%20USA!5e0!3m2!1sen!2sbr!4v1665736536646!5m2!1sen!2sbr"
            width="600"
            height="450"
            loading="lazy"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
      <span className="text-white text-3xl text-center flex justify-center p-5">
        {" "}
        Checkout our social media!{" "}
      </span>
      <Grid container className="pb-6">
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <BsLinkedin className="text-white hover:text-[#a18276] text-6xl mt-2" />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <AiFillYoutube className="text-white hover:text-[#a18276] text-7xl" />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <AiFillFacebook className="text-white hover:text-[#a18276] text-7xl" />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <BsInstagram className="text-white hover:text-[#a18276] text-6xl mt-2" />
          </div>
        </Grid>
      </Grid>
      <span>
        <Grid container className="text-white text-center pb-4 text-xs">
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            Terms of Service{" "}
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            Privacy Policy{" "}
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            Oficial Realtors of Florida{" "}
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            DMCA Notice{" "}
          </Grid>
        </Grid>
      </span>
    </div>
  );
};
