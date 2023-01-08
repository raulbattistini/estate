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
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { UserPage } from "./pages/Users";
import { RestrictPostArea } from "./pages/Blog/RestrictArea";
import { PostPageRestricted } from "./pages/Blog/RestrictArea/PostPage";
import { TermsService } from "./pages/InfoLinks/TermsService";
import { PrivacyPolicy } from "./pages/InfoLinks/PrivacyPolicy";
import { RealtorsFlorida } from "./pages/InfoLinks/RealtorsFlorida";
import { DMCANotice } from "./pages/InfoLinks/DMCANotice";
import { UsersListing } from "./pages/Users/RestrictArea/UsersListing";
import { UserPageRestricted } from "./pages/Users/RestrictArea/UserPageRestricted";
import { GoogleCallback } from "./pages/OAuthCallback/GoogleCallback";
import { FacebookCallback } from "./pages/OAuthCallback/FacebookCallback";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback/google" element={<GoogleCallback/>}/>
        <Route path="/auth/callback/facebook" element={<FacebookCallback/>}/>
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
        <Route
          path="/users/:id"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RestrictPostArea />
            </RequireAuth>
          }
        />
        <Route
          path="/posts/admin/:id"
          element={
            <RequireAuth>
              <PostPageRestricted />
            </RequireAuth>
          }
        />
        <Route
          path="/users/admin"
          element={
            <RequireAuth>
              <UsersListing />
            </RequireAuth>
          }
        />
        <Route
          path="/users/admin/:id"
          element={
            <RequireAuth>
              <UserPageRestricted />
            </RequireAuth>
          }
        />
        <Route path="/terms-of-service" element={<TermsService/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/realtors-florida" element={<RealtorsFlorida/>} />
        <Route path="/DMCA" element={<DMCANotice/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
