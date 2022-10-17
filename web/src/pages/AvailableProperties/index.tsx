import { CSSProperties, useState } from "react";
import { useGetPropertiesQuery } from "../../services/apiPropertiesSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { IProperty } from "../../interfaces";

export const AvailableProperties = () => {
  let [color, setColor] = useState("#ffffff");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { data: properties, isLoading, isError, error, isSuccess } = useGetPropertiesQuery("");

  let content: JSX.Element | null;
  if (isLoading) {
    content = <ClipLoader color={color} cssOverride={override} size={150} />;
  } else if (isSuccess) {
    content = (
      <div className="w-full">
        <Header />
        <div className="bg-[#21a0a0]">
          Properties available:
          <ul>
            {properties.map((property: IProperty, i: number) => {
              return <li key={property.estate_id}> {property.name} </li>;
            })}
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  } else {
    return <>Unexpected error.</>
  }

  return content;
};
