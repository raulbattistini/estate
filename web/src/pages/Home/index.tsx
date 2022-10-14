import { Grid } from "@mui/material";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import CityIcon from "../../assets/images/buildings-icon.png";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="bg-[#21a0a0] w-full">
        <div className="flex self-center justify-center pt-3">
          <input
            type="text"
            className="p-2 rounded-md pr-12 w-96 outline-0"
            placeholder="What you are looking for?"
          />
          <AiOutlineSearch className="absolute text-3xl ml-44 mt-1 hover:text-[#a18276]" />
        </div>
        <div className="self-center flex justify-center">
          <img src={CityIcon} alt="buildings icon"  className="static"/>
        </div>
        <span className="text-white">Home </span>
      </div>
      <Footer />
    </>
  );
};
