import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export const Welcome = () => {
   return (
    <div className="w-full">
      <Header />
      <div className="bg-[#21a0a0]">
      
        <Link to="/available-properties"> See available properties </Link>
      </div>
      <Footer />
    </div>
  );
};
