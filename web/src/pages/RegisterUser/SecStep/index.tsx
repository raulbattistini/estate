import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { registerUserFirst } from "../../../helpers/schema";

export const RegisterUserSec = () => {
  return (
    <div className="w-full bg-[#21a0a0]">
      <Header />
      <Grid container className="pb-8 pt-3">
        <Grid item xs={12}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              confirmEmail: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={() => {}}
            validationSchema={registerUserFirst}
          >
            {({ values, errors, handleChange, touched }) => {
              return (
                <Form>
                  <div className="flex flex-col items-center">
                    <label className="pt-3 text-white">
                      What you intend to do at first?
                    </label>
                    select com multiplas opcoes
                    <label className="pt-3 text-white">
                      What is your annual income(US$)? If you don't want to
                      answer, leave it blank
                    </label>
                    select com faixas de renda
                    <button
                      type="submit"
                      className="p-3 mt-5 rounded-md bg-[#048865] text-white hover:bg-green-500"
                    >
                      Create Profile
                    </button>
                  </div>{" "}
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
