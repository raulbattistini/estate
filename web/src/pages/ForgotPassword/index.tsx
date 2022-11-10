import { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import Grid  from "@mui/material/Grid";
import { Header } from "../../components/Header";
import { forgotPasswordSchema } from "../../helpers/schema";
import { api } from "../../services/api";

export const ForgotPassword = () => {
  // useeffect
  useEffect(() => {
    emailRef!.current!.focus();
  }, []);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const sendMail = async () => {
    const res = await api.post(`/mails/forgot-password`);
    console.log(res);
  };
  return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0] pb-8">
        <div className="flex justify-center">
          <span className="text-white text-center text-xl max-w-sm pt-3 pb-3">
            Forgot your password? No problem! We will send you a recovery email.
          </span>
        </div>
        <div className="flex-col flex justify-center">
          <Formik
            initialValues={{
              forgotMail: "",
            }}
            onSubmit={() => {}}
            validationSchema={forgotPasswordSchema}
          >
            {({ values, errors, handleChange, touched }) => {
              return (
                <Form className="justify-center flex flex-col">
                  <label htmlFor="email" className="text-center text-white pb-3 pt-3">
                    Email to send recovery link
                  </label>
                  <input
                    type="email"
                    placeholder="Type your email.."
                    className="flex flex-col self-center justify-center items-center pl-3 rounded-sm outline-0 p-2"
                    name="forgotMail"
                    value={values.forgotMail}
                    onChange={handleChange}
                    ref={emailRef}
                  />
                  <span className="text-center text-red-300 pt-3">
                    {!!errors.forgotMail && touched.forgotMail}
                    {!!touched.forgotMail && errors.forgotMail}
                  </span>
                  <button
                    className="p-3 mt-5 pl-5 pr-5 rounded-md bg-[#048865] text-white hover:bg-green-500 w-44 justify-center self-center" onClick={sendMail} type="button"
                  >
                    Send email
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="bg-[#c9c9c9]">
        <span>
          <Grid container className="text-white text-center pb-4 pt-4 text-xs">
            <Grid item xs={3} className="hover:text-[#046865] cursor-pointer">
              {" "}
              <div className="flex text-center justify-center"> </div> Terms of Service{" "}
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
