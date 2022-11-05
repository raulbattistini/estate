import { useContext, useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as cheerio from "cheerio";
import { Navigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { LoggedNav } from "../../../components/LoggedNav";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { IUpdateUserInfo, IUserAuth } from "../../../interfaces";
import { api } from "../../../services/api";
import { FiAlertTriangle } from "react-icons/fi";

export const UserPageRestricted = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<IUserAuth>();

  useEffect(() => {
    // @ts-ignore
    getUserById(id);
    console.log(userData);
  }, []);

  const { id } = useParams();

  const getUserById = async (id: string) => {
    const res = await api.get(`/users/${id}`);
    setUserData(res.data.user);
    console.log(res.data.user);
  };
  const handleUpdate = async (values: IUpdateUserInfo) => {
    const updatedInfo = {
      name: values.name,
      admin: values?.admin,
      email: values?.email,
      password: values.password,
      intention: values.intention,
      income: values.income,
    };
    try {
      const res = await api.put(`/users/${id}`, updatedInfo);
      toast.success(res.data.message);
      console.dir(updatedInfo);
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
    <ToastContainer/>
      <div className="w-full">
        <Header />
        <LoggedNav />
        <div className="bg-[#21a0a0]">
          {" "}
          {auth.user !== null ? (
            <div className="pb-7">
              {/* @ts-ignore */}
              {auth!.user!.map((userInfo: IUserAuth, key: number) => {
                return (
                  <div>
                    <div className="flex flex-col text-center mr-10 ml-10 text-white">
                      <span
                        className="text-center text-lg flex justify-center pb-5 pt-6 flex flex-col"
                        title="You are dealing with extremely sensible information. Be as zealous as you can."
                      >
                        {" "}
                        <strong className="text-yellow-500 font-light text-3xl pb-5">
                          {" "}
                          <FiAlertTriangle className="inline-flex self-center mr-3" /> Caution!{" "}
                          <FiAlertTriangle className="inline-flex ml-3" />
                        </strong>
                        Below you can see the info from the user. <br /> Do not make decisions without first being
                        headed up by a manager.{" "}
                      </span>
                    </div>
                    {userInfo.admin == true ? (
                      <div>
                        <Grid container className="content-center">
                          <Grid item xs={12}>
                            <Formik
                              initialValues={ userData !== null ? {
                                name: userData?.name,
                                admin: userData?.admin,
                                email: userData?.email,
                                password: userData?.password,
                                intention: userData?.intention,
                                income: userData?.income,
                              } : {
                                name: "",
                                admin: false,
                                email: "",
                                password: "",
                                intention: "",
                                income: ""
                              }}
                              onSubmit={(values) => {
                                handleUpdate(values);
                              }}
                            >
                              {({ values, errors, touched, handleChange }) => {
                                return (
                                  <Form>
                                    <div className="flex flex-col justify-center items-center">
                                      <label htmlFor="title" className="text-white mb-3">
                                        Redefine users info
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="outline-0 w-3/5 pl-2 p-1 rounded-sm text-black"
                                        onChange={handleChange}
                                        value={values.name}
                                        defaultValue={userData?.name}
                                      />
                                      <span className="text-white pt-2"> Previous: {userData?.name} </span>
                                      <span className="text-red-200">
                                        {!!errors.name && touched.name}
                                        {errors.name && !!touched.name}
                                      </span>
                                      <label htmlFor="admin" className="text-white pt-5">
                                        Is the user admin?
                                      </label>{" "}
                                      <div
                                        role="group"
                                        aria-labelledby="checkbox-group"
                                        className="flex flex-col text-white"
                                      >
                                        <label>
                                          <Checkbox name="admin" value="true" />⠀ True
                                        </label>
                                        <label>
                                          <Checkbox name="admin" value="false" />⠀ False
                                        </label>
                                      </div>
                                      <span> Previous: {userData?.admin} </span>
                                      <input
                                        type="email"
                                        name="email"
                                        className="outline-0 w-3/5 pl-2 p-1 rounded-sm text-black"
                                        onChange={handleChange}
                                        value={values.email}
                                        defaultValue={userData?.email}
                                      />
                                      <span className="text-white pt-2"> Previous: {userData?.email} </span>
                                      <span className="text-red-200">
                                        {!!errors.email && touched.email}
                                        {errors.email && !!touched.email}
                                      </span>
                                      <label htmlFor="content" className="text-white mt-9 mb-3">
                                        New temporary password
                                      </label>
                                      <input
                                        name="password"
                                        type="password"
                                        className="outline-0 w-3/5 pl-2 p-1 rounded-sm"
                                        onChange={handleChange}
                                        value={values.password}
                                        defaultValue={userData?.password}
                                      />
                                      <div id="checkbox-group" className="pt-3 text-white">
                                        What is he intending to do?
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
                                        (It was previously stated that their intention was to{" "}
                                        {userInfo!.intention!.replace(regex, "")})
                                      </span>
                                      <label className="pt-8 text-white pb-3 text-center">
                                        His your annual income(US$).
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
                                        <MenuItem className="text-white">
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
                            <span className="text-white text-center flex justify-center pt-5">
                              {" "}
                              Remember: if you don't do anything and just 'Confirm Changes' nothing will happen and the
                              user will remain as it was.{" "}
                            </span>
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      <>
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="dark"
                        />
                        <Navigate to="/welcome" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}{" "}
        </div>

        <Footer />
      </div>
    </>
  );
};
