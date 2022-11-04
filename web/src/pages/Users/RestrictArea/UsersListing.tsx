import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiAlertTriangle } from "react-icons/fi";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { IUserAuth } from "../../../interfaces";
import { api } from "../../../services/api";
import { LoggedNav } from "../../../components/LoggedNav";

export const UsersListing = () => {
  //react hooks
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<IUserAuth[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/users");
    setUserData(res.data);
  };

  return (
    <div className="w-full">
      {" "}
      <Header />
      <LoggedNav/>
      <div className="bg-[#21a0a0]">
        {auth.user !== null ? (
          <div className="text-white pb-8">
            {/* @ts-ignore */}
            {auth!.user!.map((userInfo: IUserAuth, key: number) => {
              return (
                <div>
                  {userInfo.admin == true ? (
                    <div>
                      <span className="text-center text-lg flex justify-center pb-5 pt-6 flex flex-col" title="You are dealing with extremely sensible information. Be as zealous as you can.">
                        {" "}
                        <strong className="text-yellow-500 font-light text-3xl pb-5">
                          {" "}
                          <FiAlertTriangle className="inline-flex self-center mr-3"/> Caution! <FiAlertTriangle className="inline-flex ml-3" />
                        </strong>
                        Below you can see the users from the website. Do not make decisions without first being headed
                        up by a manager.{" "}
                      </span>
                      {userData?.map((users: IUserAuth, key) => {
                        return (
                          <div className="flex justify-between max-w-lg pl-8">
                            <Link to={`/users/admin/${users.id}`} className="userPage">
                              <title className="flex flex-col text-lg mt-3" key={users.id}>
                                {users.name}
                              </title>
                              <span className="mr-9 text-sm">{users.email}</span>
                            </Link>
                          </div>
                        );
                      })}
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
      </div>{" "}
      <Footer />{" "}
    </div>
  );
};
