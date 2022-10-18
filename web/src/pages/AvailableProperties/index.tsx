import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";


export const AvailableProperties = () => {
  let [color, setColor] = useState("#ffffff");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let content: JSX.Element | null;
    content = (
      <div className="w-full">
        <Header />
        <div className="bg-[#21a0a0]">
          Properties available:
          <ul>
          dfdfdfd
          </ul>
        </div>
        <Footer />
      </div>
    );
 

  return content;
};
