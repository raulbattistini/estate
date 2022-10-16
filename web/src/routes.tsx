import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Blog } from "./pages/Blog";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/RegisterUser/FirstStep";
import { RegisterProperty } from "./pages/RegisterProperty";
import { Buy } from "./pages/Buy";
import { Sell } from "./pages/Sell";
import { Rent } from "./pages/Rent";
import { RegisterUserSec } from "./pages/RegisterUser/SecStep";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-user-2" element={<RegisterUserSec/>} />
        <Route path="/register-property" element={<RegisterProperty />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
