import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Welcome } from "../../pages/Welcome";
import { selectCurrentToken } from "./authSlice";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? <Welcome/> : <Navigate to="/login" state={{ from: location }} replace />;
};
