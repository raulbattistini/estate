import { Formik, Form } from "formik";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useLoginMutation } from "../../feats/Auth/authApiSlice";

export const Login = () => {
  // usestate
  let [color, setColor] = useState("#ffffff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useeffect
  useEffect(() => {
    emailRef!.current!.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  // useref
  const errorRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  // lib hooks
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // functions
  const handleSubmit = async (e: HTMLFormElement) => {
    e.preventDefault();

    try {
    } catch (error: any) {
      if (!error?.originalStatus) {
        setErrorMessage("No server response");
        toast.error(`Something wrong occurred: ${error.message} || ${errorMessage}`);
      } else if (error.originalStatus === 400) {
        setErrorMessage("Fill in the whole body");
        toast.error(`Something wrong occurred: ${error.message} || ${errorMessage}`);
      } else if (error.originalStatus === 401) {
        setErrorMessage("Unauthorized");
        toast.error(`Something wrong occurred: ${error.message} || ${errorMessage}`);
      } else {
        setErrorMessage("Login failed");
        toast.error(`Something wrong occurred: ${error.message} || ${errorMessage}`);
      }
    }
  };

  const handleChangeEmail = (e: React.BaseSyntheticEvent) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.BaseSyntheticEvent) => {
    setPassword(e.currentTarget.value);
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const content = isLoading ? (
    <ClipLoader color={color} cssOverride={override} size={150} />
  ) : (
    <>
      <div className="w-full">
        <Header />
        <p 
        ref={errorRef} 
        className={errorMessage ? "errmsg" : "offscreen"} 
        aria-live="assertive"
        >
          {errorMessage}
        </p>
        <div className="bg-[#21a0a0] flex flex-col text-center pb-5">
          <h1 className="text-2xl text-white pt-3">Login to see your account</h1>

          <>
            <form
              onSubmit={() => {
                handleSubmit;
              }}
            >
              <label className="pt-3 text-white justify-center flex self-center">Email</label>
              <input
                ref={emailRef}
                className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                type="email"
                placeholder="Insert your email..."
                value={email}
                onChange={handleChangeEmail}
                name="email"
              />
              <label className="pt-3 text-white justify-center flex self-center">Password</label>
              <input
                className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                type="password"
                placeholder="Insert your password..."
                value={password}
                onChange={handleChangePassword}
                name="password"
              />

              <span className="flex flex-col text-white pt-3">
                <Link to="/forgot-password" className="text-center text-purple-200">
                  Forgot your password?
                </Link>
              </span>
              <span className="flex flex-col text-white pt-3">
                Don't have an account?
                <Link to="/login" className="text-center text-green-200">
                  Register now
                </Link>
              </span>
              <button
                type="submit"
                className="p-3 mt-5 pl-5 pr-5 rounded-md bg-[#048865] text-white hover:bg-green-500"
              >
                Login
              </button>
            </form>{" "}
          </>
        </div>

        <Footer />
      </div>
    </>
  );
  return content;
};
