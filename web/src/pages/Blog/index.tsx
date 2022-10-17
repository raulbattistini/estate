import { Grid } from "@mui/material";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import defaultImg from "../../assets/images/default.jpg";

export const Blog = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0]">
        <h1 className="text-3xl text-white text-center pt-4">
          Keep yourself up to date with our posts!
        </h1>
        <div className="flex justify-center">
          <article className="max-w-lg content-center flex justify-center flex-col items-center pt-3">
            <h2 className="z-10 text-white text-center text-lg font-extralight pb-3 justify-center flex flex-col">
            Here we talk about how to buy your first property, investing with real estate, talks with masters from the area such as Grant Cardone, legal assesments we get from experienced professional lawyers and much more!
            </h2>
          </article>
        </div>
        <Grid container className="place-items-center text-center">
          <Grid item xs={5}>
            <div className="flex justify-center flex-col self-center pt-3 pb-5">
              <img
                src={defaultImg}
                alt="postImage"
                className="rounded-md justify-self-center w-56 h-32 self-center"
              />
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="flex flex-col text-white">
              <title className="flex flex-col text-2xl">
                Blog title from api map
              </title>
              <span className="mr-9">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                quam error aut corrupti, nisi tempora tempore eligendi dolorem
                saepe rem aspernatur eos labore aliquam. Error mollitia placeat
                consequuntur consectetur consequatur.
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};
