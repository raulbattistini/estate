import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Welcome = () => {
  
  const auth = useContext(AuthContext);

  const string = JSON.stringify((auth.user));

  useEffect(()=>{
    console.log(auth.user, string)
  }, [])

   return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0]">
        <p className="text-white">Olá {auth.user?.name} {string} </p>    
        <Link to="/available-properties"> See available properties </Link>
      </div>
      <Footer />
    </div>
  );
};
