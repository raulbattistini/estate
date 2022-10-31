import { useState, useEffect, useContext } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LoggedNav } from "../../../components/LoggedNav";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { IPost, IUpdatePost, IUserAuth, IValues } from "../../../interfaces";
import { api } from "../../../services/api";
import moment from "moment";
import { Formik, Form } from "formik";
import Grid  from "@mui/material/Grid";
import * as cheerio from "cheerio";
import "react-toastify/dist/ReactToastify.css";

export const PostPageRestricted = () => {
  const auth = useContext(AuthContext);
  const [postData, setPostData] = useState<IPost>({
    post_id: "",
    title: "",
    content: "",
    created_at: new Date(),
  });

  useEffect(() => {
    // @ts-ignore
    getPostById(id);
    console.log(postData);
  }, []);

  const { id } = useParams();

  const getPostById = async (id: string) => {
    const res = await api.get(`/posts/${id}`);
    setPostData(res.data);
    console.log(res.data);
  };
  const handleUpdate = async (values: IUpdatePost) => {
    const updatedInfo = {
      title: values.title,
      content: values.content,
    };
    try {
      const res = await api.put(`/admin/posts/${id}`, updatedInfo);
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
  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <Header />
        <LoggedNav />
        <div className="bg-[#21a0a0]">
          {auth.user !== null ? (
            <div className="pb-7">
              {/* @ts-ignore */}
              {auth!.user!.map((userInfo: IUserAuth, key: number) => {
                return (
                  <div>
                    {userInfo.admin == true ? (
                      <div>
                        <span className="text-center text-2xl flex justify-center pb-8 text-white">
                          {" "}
                          You are elegible to update posts. See below the info.{" "}
                        </span>
                        <Grid container className="content-center">
                          <Grid item xs={12}>
                            <Formik
                              initialValues={{
                                title: postData?.title,
                                content: postData?.content,
                              }}
                              onSubmit={(values) => {
                                handleUpdate(values);
                              }}
                            >
                              {({ values, errors, touched, handleChange }) => {
                                return (
                                  <Form>
                                    <div className="flex flex-col justify-center items-center">
                                      <label htmlFor="title" className="text-white">
                                        New post title
                                      </label>
                                      <input
                                        type="text"
                                        name="title"
                                        className="outline-0 w-3/5 pl-2 p-1 rounded-sm text-black"
                                        onChange={handleChange}
                                        value={values.title}
                                        defaultValue={postData?.title}
                                      />
                                      <span className="text-white"> Previous: {postData?.title} </span>
                                      <span className="text-red-200">
                                        {!!errors.title && touched.title}
                                        {errors.title && !!touched.title}
                                      </span>
                                      <label htmlFor="content" className="text-white mt-9">
                                        New post content
                                      </label>
                                      <textarea
                                        name="content"
                                        className="outline-0 w-3/5 pl-2 p-1 rounded-sm"
                                        onChange={handleChange}
                                        value={values.content}
                                        defaultValue={postData?.content}
                                      />
                                      <span className="text-white max-w-lg"> Previous: {postData?.content} </span>
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
                              post will remain as it was.{" "}
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
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};
