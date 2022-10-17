import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { selectCurrentToken, selectCurrentUser } from "../../feats/Auth/authSlice";

export const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}` : "Welcome!";

  const tokenAbbreviation = `${token.slice(0, 9)}...`;

  return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0]">
        <span className="text-white text-center"> {welcome} </span>
        <span className="text-white text-center"> Your token start with {tokenAbbreviation}</span>
        <Link to="/available-properties"> See available properties </Link>
      </div>
      <Footer />
    </div>
  );
};
