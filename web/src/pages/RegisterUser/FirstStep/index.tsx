import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { registerUserFirst } from "../../../helpers/schema";
import { useRegister } from "../../../contexts/Register/RegisterContext";
import { RegisterAction } from "../../../interfaces";

export const RegisterUser = () => {
  const { dispatch, state } = useRegister();

  useEffect(() => {
    dispatch({
      type: RegisterAction.setCurrentStep,
      payload: 0,
    });
  }, []);

  const navigate = useNavigate();

  const handleNextStep = (
    name: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string
  ) => {
    dispatch({
      type: RegisterAction.setName,
      payload: name,
    });
    dispatch({
      type: RegisterAction.setEmail,
      payload: email,
    });
    dispatch({
      type: RegisterAction.setConfirmEmail,
      payload: confirmEmail,
    });
    dispatch({
      type: RegisterAction.setPassword,
      payload: password,
    });
    dispatch({
      type: RegisterAction.setConfirmPassword,
      payload: confirmPassword,
    });
    navigate('/register-user-2')
    // } catch (error: any) {
    //   throw new Error(error.message);
    //   // toast.error(error.res.data.message);
    // }
  };
  let initialValues = {
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  };

  let savedVal = {
    name: state.name,
    email: state.email,
    confirmEmail: state.confirmEmail,
    password: state.password,
    confirmPassword: state.confirmPassword,
  };

  return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0] pt-5 pb-5">
        <h1 className="flex justify-center text-3xl text-white divide-x">
          Create a new profile
        </h1>

        <Grid container>
          <Grid item xs={12}>
            <Formik
              initialValues={ state.name === "" || state.email === ""
              ? initialValues
              : savedVal}
              onSubmit={(state) => {
                handleNextStep(
                  state.name,
                  state.email,
                  state.confirmEmail,
                  state.password,
                  state.confirmPassword
                );
              }}
              validationSchema={registerUserFirst}
            >
              {({ values, errors, handleChange, touched }) => {
                return (
                  <Form>
                    <div className="flex flex-col items-center">
                      <label className="pt-3 text-white">Full Name</label>
                      <>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="text"
                        placeholder="Insert your name..."
                        value={values.name}
                        onChange={handleChange}
                        name="name"
                      />

                      <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.name && errors.name}
                        {touched.name && !!errors.name}
                      </span>
                      </>
                      <label className="pt-3 text-white">Email</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="email"
                        placeholder="Insert your email..."
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                      />

                      <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.email && errors.email}
                        {touched.email && !!errors.email}
                      </span>
                      <label className="pt-3 text-white">Confirm email</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="email"
                        placeholder="Confirm your email..."
                        value={values.confirmEmail}
                        onChange={handleChange}
                        name="confirmEmail"
                      />

                      <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.confirmEmail && errors.confirmEmail}
                        {touched.confirmEmail && !!errors.confirmEmail}
                      </span>
                      <label className="pt-3 text-white">Password</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="password"
                        placeholder="Insert your password..."
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                      />

                      <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.password && errors.password}
                        {touched.password && !!errors.password}
                      </span>
                      <label className="pt-3 text-white">
                        Confirm password
                      </label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="password"
                        placeholder="Confirm your password..."
                        value={values.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                      />

                      <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.confirmPassword && errors.confirmPassword}
                        {touched.confirmPassword && !!errors.confirmPassword}
                      </span>
                      <span className="flex flex-col text-white pt-3">
                        Already have an account?
                        <Link
                          to="/login"
                          className="text-center text-green-200"
                        >
                          Login instead
                        </Link>
                      </span>
                      <button
                        type="submit"
                        className="p-3 mt-5 rounded-md bg-[#048865] text-white hover:bg-green-500"
                      >
                        Next Step
                      </button>
                    </div>{" "}
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};
