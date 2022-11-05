import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Grid  from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as cheerio from "cheerio";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { IValues, IUserAuth } from "../../interfaces";
import { updateUserInfoSchema } from "../../helpers/schema";
import { api } from "../../services/api";

export const UserPage = () => {
  //react hooks
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<IValues>();

  useEffect(() => {
    // @ts-ignore
    getUserById(id);
    console.log(userData);
  }, []);

  useEffect(() => {
    console.log(auth.user, userData);
  }, []);

  //lib hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // functions
  const getUserById = async (id: string) => {
    const res = await api.get(`/users/${id}`);
    setUserData(res.data);
    console.log(res.data);
  };

  const logout = () => {
    auth.signout();
    navigate("/login");
  };

  const handleUpdate = async (values: IValues) => {
    const updatedInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
      admin: false,
      intention: values.intention,
      income: values.income,
    };
    try {
      const res = await api.put(`/users/${id}`, updatedInfo);
      toast.success(res.data.message);
    } catch (error) {
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
    }
  };

  // constants

  const regex = /[^a-zA-Z,]/g;

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        {" "}
        <Header />
        <div className="bg-[#21a0a0] pb-5">
          <Grid container>
            {" "}
            <Grid item xs={12}>
              <div className="mr-5">
                <RiLogoutBoxRLine
                  className="text-white text-4xl float-right rounded-md cursor-pointer mt-2"
                  onClick={logout}
                  title="Logout"
                />
              </div>
            </Grid>
          </Grid>
          {auth.user !== null ? (
            <div className="">
                {/* @ts-ignore-next-line */}
              {auth!.user!.map((userInfo: IUserAuth, key: number) => {
                return (
                  <div>
                    <Grid container className="content-center">
                      <Grid item xs={12}>
                        <Formik
                          initialValues={{
                            name: userInfo?.name,
                            email: userInfo?.email,
                            password: "",
                            confirmPassword: "",
                            intention: userInfo?.intention,
                            income: userInfo?.income
                          }}
                          onSubmit={(values) => {
                            handleUpdate(values);
                          }}
                          validationSchema={updateUserInfoSchema}
                        >
                          {({ values, errors, touched, handleChange }) => {
                            return (
                              <Form>
                                <span className="text-white text-xl flex justify-center pt-3 pb-8">
                                  {" "}
                                  Need to update your info?{" "}
                                </span>
                                <div className="flex flex-col justify-center items-center">
                                  <label htmlFor="name" className="text-white">
                                    Your name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    className="outline-0 w-1/5 pl-2 p-1 rounded-sm mb-7 text-black"
                                    onChange={handleChange}
                                    defaultValue={userInfo!.name}
                                  />
                                  <label htmlFor="email" className="text-white">
                                    Your email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    className="outline-0 w-1/5 pl-2 p-1 rounded-sm mb-7"
                                    onChange={handleChange}
                                    defaultValue={userInfo.email}
                                  />
                                  <label htmlFor="password" className="text-white">
                                    Your new password
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    className="outline-0 w-1/5 pl-2 p-1 rounded-sm mb-7"
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="confirmPassword" className="text-white">
                                    Retype your new password
                                  </label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    className="outline-0 w-1/5 pl-2 p-1 rounded-sm mb-7"
                                    onChange={handleChange}
                                  />
                                  <div id="checkbox-group" className="pt-3 text-white">
                                    What you intend to do?
                                  </div>
                                  <div
                                    role="group"
                                    aria-labelledby="checkbox-group"
                                    className="flex flex-col text-white"
                                  >
                                    <label>
                                      <Field type="checkbox" name="intention" value="buy" />⠀ Buy
                                    </label>
                                    <label>
                                      <Field type="checkbox" name="intention" value="sell" />⠀ Sell
                                    </label>
                                    <label>
                                      <Field type="checkbox" name="intention" value="rent" />⠀ Rent
                                    </label>
                                    <label>
                                      <Field type="checkbox" name="intention" value="just-looking" />⠀ Just Looking
                                    </label>
                                  </div>
                                  <span className="flex justify-center text-sm pt-1 text-white">
                                    {" "}
                                    (You previously said that your intention was to{" "}
                                    {userInfo!.intention!.replace(regex, "")})
                                  </span>
                                  <label className="pt-8 text-white pb-3 text-center">
                                    What is your annual income(US$)? If you don't change, it will be kept as previously
                                    declared. <br />
                                    We use this info to show you the best deals based on your declared income.
                                  </label>
                                  <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={values.income}
                                    label="income"
                                    name="income"
                                    defaultValue={userInfo.income}
                                    onChange={handleChange}
                                    error={!!touched.income && !!errors.income}
                                    className="w-2/5 text-white"
                                  >
                                    <MenuItem value={""} className="text-white">
                                      <em>Select...</em>
                                    </MenuItem>
                                    <MenuItem value={"up-to-25000"}>Up to 25k/ year</MenuItem>
                                    <MenuItem value={"25001-40000"}>25.001 to 40.000k/ year</MenuItem>
                                    <MenuItem value={"40001-65000"}>40.001 to 65.000k/ year</MenuItem>
                                    <MenuItem value={"60001-85000"}>60.001 to 85.000k/ year</MenuItem>
                                    <MenuItem value={"85001-100000"}>85.001 to 100.000k/ year</MenuItem>
                                    <MenuItem value={"100001-1250000"}>100.001 to 125.000k/ year</MenuItem>
                                    <MenuItem value={"prefer-not-answer"}>Prefer not to answer</MenuItem>
                                  </Select>
                                  <button
                                    type="submit"
                                    className="p-3 mt-5 rounded-md bg-[#048865] text-white hover:bg-green-500 w-32"
                                  >
                                    Confirm changes
                                  </button>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};
