import { useState, useEffect } from "react";
import Grid  from "@mui/material/Grid";
import { Link } from "react-router-dom";
import moment from "moment";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import defaultImg from "../../assets/images/default.jpg";
import { api } from "../../services/api";
import { IPost } from "../../interfaces";

export const Blog = () => {
  const [postData, setPostData] = useState<IPost[]>([
    {
      post_id: "",
      title: "",
      content: "",
      created_at: new Date(),
    },
  ]);

  useEffect(() => {
    load();
  }, []);

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
      <div className="bg-[#21a0a0]">
        <h1 className="text-3xl text-white text-center pt-4">Keep yourself up to date with our posts!</h1>
        <div className="flex justify-center">
          <article className="max-w-lg content-center flex justify-center flex-col items-center pt-3">
            <h2 className="z-10 text-white text-center text-lg font-extralight pb-3 justify-center flex flex-col">
              Here we talk about how to buy your first property, investing with real estate, talks with masters from the
              area such as Grant Cardone, legal assesments we get from experienced professional lawyers and much more!
            </h2>
          </article>
        </div>
        <Grid container className="place-items-center text-center">
          <Grid item xs={5}>
            <div className="flex justify-center flex-col self-center pt-3 pb-5">
              <img src={defaultImg} alt="postImage" className="rounded-md justify-self-center w-56 h-32 self-center" />
            </div>{" "}
            <div className="flex justify-center flex-col self-center pt-3 pb-5">
              <img
                src={defaultImg}
                alt="postImage"
                className="rounded-md justify-self-center w-56 h-32 self-center mt-5"
              />
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="flex flex-col text-white">
              {postData?.map((posts: IPost, key) => {
                return (
                  <>
                    <Link to={`/posts/${posts.post_id}`} className="userPage" target="_blank" rel="noopener noreferrer">
                      <button
                        onClick={() => {
                          getSinglePost(posts.post_id);
                        }}
                      >
                        <title className="flex flex-col text-lg mt-3" key={posts.post_id}>
                          {posts.title}
                        </title>
                    <span className="mr-9 text-sm">{posts.content}</span>
                    <span className="flex flex-col">
                      <>Date added: {moment(posts.created_at).format("DD/MM/YYYY")}</>{" "}
                    </span>
                      </button>
                    </Link>
                  </>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};
