import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LoggedNav } from "../../../components/LoggedNav";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { IPost, IUserAuth } from "../../../interfaces";
import { api } from "../../../services/api";
import moment from "moment";

export const RestrictPostArea = () => {
  //react hooks
  const auth = useContext(AuthContext);
  const [postData, setPostData] = useState<IPost[]>([
    {
      post_id: "",
      title: "",
      content: "",
      created_at: new Date(),
    },
  ]);
  const isAdmin = () => {
    const user = auth.user;
    if (!user) {
      return navigate("/login");
    } else if (user.admin !== true) {
      console.log(user.admin)
    }
    console.log(user.admin);
  };
  useLayoutEffect(() => {
    isAdmin();
  }, []);
  useEffect(() => {
    load();
    console.log(auth.user);
  }, []);

  const navigate = useNavigate();
  const load = async () => {
    const res = await api.get("/posts");
    setPostData(res.data.posts);
  };

  const getSinglePost = async (id: string) => {
    const res = await api.get(`/posts/${id}`);
  };

  return (
    <div className="w-full">
      <Header />
      <LoggedNav />
      <div className="bg-[#21a0a0]">
        <div className="text-white">
          {/* @ts-ignore */}
          <div>
            {!auth.user ? (
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
                <Navigate to="/login" />
              </>
            ) : (
              <div>
                {" "}
                {/* {auth!.user!.admin !== true ? ( */}
                {/* <>
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
                </> */}
                {/* ) : ( */}
                <>
                  <span className="text-center text-lg flex justify-center pb-5 flex flex-col">
                    {" "}
                    Administrative procedures against bad users? <br />{" "}
                    <Link to="/users/admin/" className="underline hover text-[#c8c8c8]">
                      Go here
                    </Link>{" "}
                  </span>
                  <span className="text-center text-lg flex justify-center pb-5">
                    {" "}
                    You are elegible to update posts. See below the listing.{" "}
                  </span>
                  {postData?.map((posts: IPost, key) => {
                    return (
                      <div className="flex justify-center max-w-lg pl-8">
                        <Link to={`/posts/admin/${posts.post_id}`} className="userPage">
                          <title className="flex flex-col text-lg mt-3" key={posts.post_id}>
                            {posts.title}
                          </title>
                          <span className="mr-9 text-sm">{posts.content}</span>
                          <span className="flex flex-col">
                            <>Date added: {moment(posts.created_at).format("DD/MM/YYYY")}</>{" "}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </>
                {/* )}{" "} */}
              </div>
            )}
          </div>
          );
        </div>
      </div>
      <Footer />
    </div>
  );
};
