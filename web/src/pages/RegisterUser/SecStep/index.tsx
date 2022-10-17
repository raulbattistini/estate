import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, MenuItem, Select } from "@mui/material";
import { Formik, Form } from "formik";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Checkbox } from "../../../components/Checkbox";
import { registerUserFirst } from "../../../helpers/schema";
import {
  IData,
  IState,
  RegisterAction,
  IFinalValues,
} from "../../../interfaces";
import { useRegister } from "../../../contexts/Register/RegisterContext";
import { api } from "../../../services/api";
import { generateUUID } from "../../../helpers/generateUUID";

const IntentionCheckbox: IData[] = [
  {
    order: 0,
    name: "Sell",
  },
  {
    order: 1,
    name: "Buy",
  },
  {
    order: 2,
    name: "Rent",
  },
  {
    order: 3,
    name: "Just looking",
  },
];

export const RegisterUserSec = () => {
  const navigate = useNavigate();

  const { dispatch, state } = useRegister();

  const arePrevValEmpty = () => {
    if (
      state.name === "" &&
      state.email === "" &&
      state.confirmEmail === "" &&
      state.password === "" &&
      state.confirmPassword === ""
    ) {
      navigate("/register-user");
    }
  };

  useEffect(() => {
    arePrevValEmpty();
    dispatch({
      type: RegisterAction.setCurrentStep,
      payload: 1,
    });
  }, []);

  const [data, setData] = useState(
    IntentionCheckbox.sort((a, b) => a.order - b.order)
  );

  const handleNextStep = (intention: string, income?: string) => {
    dispatch({
      type: RegisterAction.setIntention,
      payload: intention,
    });

    dispatch({
      type: RegisterAction.setIncome,
      payload: income,
    });
  };

  const handleSubmit = async (state: IState, values: IFinalValues) => {
    const addRegister = {
      user_id: generateUUID(),
      name: state.name,
      email: state.email,
      password: state.password,
      intention: values.intention,
      income: values.income,
    };
    try {
      const res = await api.post("/users", addRegister);
    } catch (error: any) {
      toast.error(error.res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-[#21a0a0]">
      <Header />
      <Grid container className="pb-8 pt-3">
        <Grid item xs={12}>
          <Formik
            initialValues={{
              intention: "",
              income: "",
            }}
            onSubmit={(values) => {
              handleNextStep(values.intention, values.income);
              handleSubmit(state, values);
            }}
            validationSchema={registerUserFirst}
          >
            {({ values, errors, handleChange, touched }) => {
              return (
                <Form>
                  <div className="flex flex-col items-center">
                    <label className="pt-3 text-white">
                      What you intend to do at first?
                    </label>
                    <ul>
                      {data.map((obj, index) => (
                        <li
                          key={index}
                          className="text-white flex place-items-center rounded-md"
                        >
                          <Checkbox obj={obj} onChange={handleChange} />
                        </li>
                      ))}
                    </ul>

                    <label className="pt-3 text-white pb-3">
                      What is your annual income(US$)? If you don't want to
                      answer, leave it blank <br />
                      We use this info to show you the best deals based on your
                      declared income.
                    </label>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.income}
                      label="income"
                      name="income"
                      defaultValue={""}
                      onChange={handleChange}
                      error={!!touched.income && !!errors.income}
                      className="w-2/5 text-white"
                    >
                      <MenuItem value={""} className="text-white">
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem value={"up-to-25000"}>Up to 25k/ year</MenuItem>
                      <MenuItem value={"25001-40000"}>
                        25.001 to 40.000k/ year
                      </MenuItem>
                      <MenuItem value={"40001-65000"}>
                        40.001 to 65.000k/ year
                      </MenuItem>
                      <MenuItem value={"60001-85000"}>
                        60.001 to 85.000k/ year
                      </MenuItem>
                      <MenuItem value={"85001-100000"}>
                        85.001 to 100.000k/ year
                      </MenuItem>
                      <MenuItem value={"100001-1250000"}>
                        100.001 to 125.000k/ year
                      </MenuItem>
                      <MenuItem value={"40001-65000"}>
                        Prefer not to answer
                      </MenuItem>
                    </Select>
                    <span className="flex flex-col text-white pt-3">
                      Already have an account?
                      <Link to="/login" className="text-center text-green-200">
                        Login instead
                      </Link>
                    </span>
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
