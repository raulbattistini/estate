import { Formik, Form } from "formik";
import { useEffect, useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as cheerio from "cheerio";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { loginSchema } from "../../helpers/schema";
import { Grid } from "@mui/material";
import { BsFacebook } from "react-icons/bs";

export const Login = () => {
  // state

  const [selected, setSelected] = useState(false);
  // useeffect
  useEffect(() => {
    emailRef!.current!.focus();
  }, []);

  // useref
  const emailRef = useRef<HTMLInputElement | null>(null);

  // usecontext
  const auth = useContext(AuthContext);

  // lib hooks
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (email && password) {
        const isLogged = await auth.signin(email, password);
        console.log(isLogged);
        if (isLogged) {
          console.log(`Welcome ${auth.user?.name[1]}`);
          navigate("/welcome");
        } else {
          console.log("Something unexpected occurred.");
        }
      }
    } catch (error: any) {
      // return res.data.message
      const $ = cheerio.load(error.response.data);
      var axiosParsed = $("pre").text();
      toast.error(axiosParsed, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(axiosParsed);
      // navigate("/login");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <Header />
        <div className="bg-[#21a0a0] flex flex-col text-center pb-5">
          <h1 className="text-2xl text-white pt-3">Login to see your account</h1>

          <>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                handleLogin(values.email, values.password);
              }}
              validationSchema={loginSchema}
            >
              {({ values, errors, handleChange, touched }) => {
                return (
                  <Form>
                    <label className="pt-3 text-white justify-center flex self-center">Email</label>
                    <input
                      ref={emailRef}
                      className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                      type="text"
                      placeholder="Insert your email..."
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                    />
                    <span className="text-red-300 mt-2 text-center flex flex-col">
                      {!!touched.email && errors.email}
                      {touched.email && !!errors.email}
                    </span>
                    <label className="pt-3 text-white justify-center flex self-center">Password</label>
                    {selected === false ? (
                      <>
                        <div className="flex justify-center ml-56">
                          <MdVisibility
                            className="cursor-pointer absolute mt-2"
                            onClick={() => {
                              setSelected(!selected);
                            }}
                          />
                        </div>
                        <input
                          className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                          type="password"
                          placeholder="Insert your password..."
                          value={values.password}
                          onChange={handleChange}
                          name="password"
                          required
                        />

                        <span className="text-red-300 mt-2 text-center flex flex-col">
                          {!!touched.password && errors.password}
                          {touched.password && !!errors.password}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center ml-56">
                          <AiFillEyeInvisible
                            className="cursor-pointer absolute mt-2"
                            onClick={() => {
                              setSelected(!selected);
                            }}
                          />
                        </div>
                        <input
                          className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                          type="text"
                          placeholder="Insert your password..."
                          value={values.password}
                          onChange={handleChange}
                          name="password"
                          required
                        />

                        <span className="text-red-300 mt-2 text-center flex flex-col">
                          {!!touched.password && errors.password}
                          {touched.password && !!errors.password}
                        </span>
                      </>
                    )}
                    <>
                      <Grid container className="m-0 p-0 justify-between col-span-2">
                        <Grid item xs={12} className="pb-4 pt-4">
                          <span className="text-white"> Or...</span>
                        </Grid>
                        <Grid item xs={12} className="col-span-1">
                          {" "}
                          <div className="flex items-center">
                            <BsFacebook className="text-white absolute mt-5 text-md" style={{ marginLeft: "34.5rem" }} />
                          </div>
                          <FacebookLogin
                            appId="1088597931155576"
                            style={{
                              backgroundColor: "#4267b2",
                              color: "#fff",
                              fontSize: "16px",
                              padding: "8px 30px",
                              border: "none",
                              borderRadius: "4px",
                              textAlign: "end",
                              justifySelf: "flex-end",
                              justifyContent: "flex-end"
                            }}
                            onSuccess={(response) => {
                              console.log("Login Success!", response);
                            }}
                            onFail={(error) => {
                              console.log("Login Failed!", error);
                            }}
                            onProfileSuccess={(response) => {
                              console.log("Get Profile Success!", response);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {" "}
                          <div className="flex justify-center mt-8">
                          <GoogleLogin
                            onSuccess={(credentialResponse) => {
                              console.log(credentialResponse);
                            }}
                            onError={() => {
                              console.log("Login Failed");
                            }}
                          />
                          </div>
                        </Grid>
                      </Grid>
                    </>
                    <span className="flex flex-col text-white pt-3">
                      <Link to="/forgot-password" className="text-center text-purple-200">
                        Forgot your password?
                      </Link>
                    </span>
                    <span className="flex flex-col text-white pt-3">
                      Don't have an account?
                      <Link to="/register-user" className="text-center text-green-200">
                        Register now
                      </Link>
                    </span>
                    <button
                      type="submit"
                      className="p-3 mt-5 pl-5 pr-5 rounded-md bg-[#048865] text-white hover:bg-green-500"
                    >
                      Login
                    </button>
                  </Form>
                );
              }}
            </Formik>{" "}
          </>
        </div>

        <Footer />
      </div>
    </>
  );
};
