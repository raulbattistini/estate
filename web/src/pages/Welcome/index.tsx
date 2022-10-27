import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { IUserAuth } from "../../interfaces";

export const Welcome = () => {
  const auth = useContext(AuthContext);

  const string = JSON.stringify(auth.user?.name);

  useEffect(() => {
    console.log(auth.user, string);
  }, []);
  
  const regex = /(<([^>]+)>)/gi;

  return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0]">
        {auth.user !== null ? (
          <div className="text-white">
            {auth!.user!.map((userInfo: IUserAuth, key: number) => {
              return (
                <div>
                  <span className="flex justify-center text-xl pt-5"> Hi {userInfo.name}, how you doing today?</span>
                  <span className="flex justify-center text-xl pt-5"> Do you want to {userInfo.intention!.replace(regex, "")}?</span>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-center">
          <span className="flex text-white self-center">
            <Link to="/available-properties"> Or maybe... See available properties </Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};
