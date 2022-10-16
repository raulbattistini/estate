import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { registerUserFirst } from "../../../helpers/schema";

export const RegisterUser = () => {
  const navigate = useNavigate();
  const nextStep = () =>{ navigate("/register-user-2")};
    // console.log(name, email, confirmEmail, password, confirmPassword);
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
              initialValues={{
                name: "",
                email: "",
                confirmEmail: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={() => {
                nextStep;
              }}
              validationSchema={registerUserFirst}
            >
              {({ values, errors, handleChange, touched }) => {
                return (
                  <Form>
                    <div className="flex flex-col items-center">
                      <label className="pt-3 text-white">Full Name</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="text"
                        placeholder="Insert your name..."
                        value={values.name}
                        onChange={handleChange}
                      />
                      <label className="pt-3 text-white">Email</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="email"
                        placeholder="Insert your email..."
                        value={values.email}
                        onChange={handleChange}
                      />
                      <label className="pt-3 text-white">Confirm email</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="email"
                        placeholder="Confirm your email..."
                        value={values.confirmEmail}
                        onChange={handleChange}
                      />
                      <label className="pt-3 text-white">Password</label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="password"
                        placeholder="Insert your password..."
                        value={values.password}
                        onChange={handleChange}
                      />
                      <label className="pt-3 text-white">
                        Confirm password
                      </label>
                      <input
                        className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                        type="password"
                        placeholder="Confirm your password..."
                        value={values.confirmPassword}
                        onChange={handleChange}
                      />
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
                        onClick={nextStep}
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
