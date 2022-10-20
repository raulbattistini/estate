import { Formik, Form } from "formik";
import { useState, useEffect, useRef, CSSProperties, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { loginSchema } from "../../helpers/schema";

export const Login = () => {
  // usestate
  let [color, setColor] = useState("#ffffff");
  // useeffect
  useEffect(() => {
    emailRef!.current!.focus();
  }, []);

  // useref
  const emailRef = useRef<HTMLInputElement | null>(null);

  // lib hooks
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (email && password) {
        const isLogged = await auth.signin(email, password);
        console.log(isLogged);
        if (isLogged) {
          toast.success(`Welcome ${auth!.user}`);
          navigate("/available-properties");
        } else {
          navigate("/login");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let content;
  content = (
    <>
      <div className="w-full">
        <Header />
        <div className="bg-[#21a0a0] flex flex-col text-center pb-5">
          <h1 className="text-2xl text-white pt-3">Login to see your account</h1>

          <>
            <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={(values)=>{handleLogin(values.email, values.password)}}
            validationSchema={loginSchema}
            >
              {({ values, errors, handleChange, touched }) => {
                return (
                  <Form>
                    <label className="pt-3 text-white justify-center flex self-center">Email</label>
                    <input
                      ref={emailRef}
                      className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                      type="text"
                      placeholder="Insert your email..."
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                    />
                    <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.email && errors.email}
                        {touched.email && !!errors.email}
                      </span>
                    <label className="pt-3 text-white justify-center flex self-center">Password</label>
                    <input
                      className="outline-0 w-1/5 pl-2 p-1 rounded-sm"
                      type="password"
                      placeholder="Insert your password..."
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      required
                    />
                    <span className="text-red-300 mt-2 text-center flex flex-col">
                        {!!touched.password && errors.password}
                        {touched.password && !!errors.password}
                      </span>
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
                  </Form>
                );
              }}
            </Formik>{" "}
          </>
        </div>

        <Footer />
      </div>
    </>
  );
  return content;
};
