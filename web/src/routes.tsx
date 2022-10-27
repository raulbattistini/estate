import { BrowserRouter as Router, Routes as Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Blog } from "./pages/Blog";
import { PostPage } from "./pages/Blog/PostPage";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/RegisterUser/FirstStep";
import { Buy } from "./pages/Buy";
import { Sell } from "./pages/Sell";
import { Rent } from "./pages/Rent";
import { RegisterUserSec } from "./pages/RegisterUser/SecStep";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Welcome } from "./pages/Welcome";
import { AvailableProperties } from "./pages/AvailableProperties";
import { RequireAuth } from "./contexts/Auth/RequireAuth";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-user-2" element={<RegisterUserSec />} />
        <Route
          path="/welcome"
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/available-properties"
          element={
            <RequireAuth>
              <AvailableProperties />
            </RequireAuth>
          }
        />
        <Route
          path="/buy"
          element={
            <RequireAuth>
              <Buy />
            </RequireAuth>
          }
        />
        <Route
          path="/sell"
          element={
            <RequireAuth>
              <Sell />
            </RequireAuth>
          }
        />
        <Route
          path="/rent"
          element={
            <RequireAuth>
              <Rent />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
