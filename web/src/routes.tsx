import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
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
import { ForgotPassword } from "./pages/ForgotPassword";
import { Welcome } from "./pages/Welcome";
import { store } from "./app/store";
import { AvailableProperties } from "./pages/AvailableProperties";
import { RequireAuth } from "./feats/Auth/RequireAuth";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Provider store={store}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-user-2" element={<RegisterUserSec />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<RequireAuth />}>
            <Route path="/available-properties" element={<AvailableProperties />} />
            <Route path="/register-property" element={<RegisterProperty />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/rent" element={<Rent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Provider>
      </Routes>
    </Router>
  );
};
