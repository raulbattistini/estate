import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { IPost } from "../../interfaces";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const PostPage = () => {
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

  return (
    <div className="w-full bg-[#21a0a0]">
      <Header />
      <ul className="text-white">
        <div className="flex justify-center pt-5">
          <li key={postData?.post_id} className="flex flex-col">
            <span className="text-white text-center text-xl"> {postData.title} </span>
            <p className="text-center pt-5 max-w-lg"> {postData.content} </p>
            <p className="text-center pt-5"> Date added: {moment(postData.created_at).format("DD/MM/YYYY")} </p>
          </li>
        </div>
      </ul>
      <Footer />
    </div>
  );
};
