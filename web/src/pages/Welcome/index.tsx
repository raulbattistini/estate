import { useContext, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AvailableProperties } from "../../components/AvailableProperties";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LoggedNav } from "../../components/LoggedNav";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { IUserAuth } from "../../interfaces";
import { api } from "../../services/api";

export const Welcome = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log(auth.user);
  }, []);

  const getUser = async (id: string) => {
    const res = await api.get(`/users/${id}`);
  };
  return (
    <div className="w-full">
      <Header />
      <LoggedNav />
      <div className="bg-[#21a0a0]">
        {auth.user !== null ? (
          <div className="text-white"> 
          {/* @ts-ignore-next-line */}
            {auth!.user!.map((userInfo: IUserAuth, key: number) => {
              return (
                <div>
                  <span className="flex justify-center text-xl"> Hi {userInfo.name}, how you doing today?</span>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-center flex-col">
          <span className="flex text-white self-center pb-5 pt-8 text-xl"> Available properties:</span>
          <AvailableProperties />
        </div>
      </div>
      <Footer />
    </div>
  );
};
