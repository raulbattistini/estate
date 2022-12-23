import { useState } from "react";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { AiFillYoutube } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { newsletterSchema } from "../../helpers/schema";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export const Footer = () => {
  const [emailNotification, setEmailNotification] = useState("");
  const redirLinkedin = () => {
    window.location.assign("https://linkedin.com/");
  };
  const redirYoutube = () => {
    window.location.assign("https://youtube.com/");
  };
  const redirFacebook = () => {
    window.location.assign("https://facebook.com/");
  };
  const redirInstagram = () => {
    window.location.assign("https://instagram.com/");
  };

  // 
  const sendMail = async () => {
    const res = await api.post(`/mails/newsletter`);
    console.log(res);
  };
  return (
    <div className="bg-[#046865] w-full">
      <div className="block text-center">
        <span className="flex justify-center text-3xl text-white pt-5">
          {" "}
          Want to know the current value of your home?
        </span>
        <Formik
          initialValues={{
            emailNotification: "",
          }}
          onSubmit={(values) => {
            setEmailNotification(values.emailNotification);
          }}
          validationSchema={newsletterSchema}
        >
          {({ values, errors, touched, handleChange }) => {
            return (
              <Form>
                <input
                  type="text"
                  className="w-60 p-2 rounded-sm mt-3 outline-0"
                  placeholder="Type your email"
                  value={values.emailNotification}
                  name="emailNotification"
                  onChange={handleChange}
                />
                <button className="bg-[#a18276] ml-5 rounded-sm p-2 text-white" type="submit" onClick={sendMail}>
                  {" "}
                  Check it{" "}
                </button>
                <span className="text-red-300 mt-2 text-center flex flex-col font-inter">
                  {!!touched.emailNotification && errors.emailNotification}
                  {touched.emailNotification && !!errors.emailNotification}
                </span>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="pt-5 self-center">
        <span className="flex justify-center text-white text-3xl"> Where we are located </span>
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
      <span className="text-white text-3xl text-center flex justify-center p-5"> Checkout our social media! </span>
      <Grid container className="pb-6">
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <BsLinkedin className="text-white hover:text-[#a18276] text-6xl mt-2 cursor-pointer" onClick={redirLinkedin} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <AiFillYoutube className="text-white hover:text-[#a18276] text-7xl cursor-pointer" onClick={redirYoutube} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <AiFillFacebook className="text-white hover:text-[#a18276] text-7xl cursor-pointer" onClick={redirFacebook} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="flex justify-center self-center items-center text-center">
            <BsInstagram className="text-white hover:text-[#a18276] text-6xl mt-2 cursor-pointer" onClick={redirInstagram} />
          </div>
        </Grid>
      </Grid>
      <span>
        <Grid container className="text-white text-center pb-4 text-xs">
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            <Link to="/terms-of-service">Terms of Service </Link>
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            <Link to="/privacy-policy">Privacy Policy </Link>
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            <Link to="/realtors-florida">Oficial Realtors of Florida </Link>{" "}
          </Grid>
          <Grid item xs={3} className="hover:text-[#c8c8c8] cursor-pointer">
            {" "}
            <Link to="/DMCA">DMCA Notice </Link>
          </Grid>
        </Grid>
      </span>
    </div>
  );
};
