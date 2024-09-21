import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fishes from "../assets/fishes.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    NameFirst: "",
    NameLast: "",
    email: "",
    Pass: "",
    Admin: false,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email: credentials.email,
        Pass: credentials.password,
      });
      console.log(res.data);

      navigate("/");
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        signupData
      );
      console.log(res.data);
      console.log("Signed up");
      navigate("/login");
    } catch (error) {
      console.error(
        "Signup Failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center  gap-8">
        <div className="w-1/3 bg-slate-200"></div>
        {isLoggingIn ? (
          <div className="w-1/2 mt-12">
            <p className="text-3xl font-bold ">Login form</p>

            <br></br>
            <button onClick={() => setIsLoggingIn(false)}>
              Don't have an account? <span className="underline">Sign Up</span>
            </button>

            <br></br>
            <form
              onSubmit={submitLogin}
              className="flex flex-col w-3/4 gap-2 mt-8"
            >
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border "
                type="email"
                name="email"
                value={credentials.email}
                required
                onChange={handleLoginChange}
                placeholder="Email"
              />
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border"
                type="password"
                name="password"
                value={credentials.password}
                required
                onChange={handleLoginChange}
                placeholder="Password"
              />

              <button
                type="submit"
                className="px-4 py-4 gap-2 mt-8 w-full bg-sky-200 rounded-lg text-white hover:bg-sky-300 transition duration-3"
              >
                Create account
              </button>
            </form>

            <br></br>
            <br></br>
            <br></br>
          </div>
        ) : (
          <div className="w-1/2 mt-12">
            <p className="text-3xl font-bold ">Create account</p>

            <button onClick={() => setIsLoggingIn(true)}>
              Already have an account? <span className="underline">Log In</span>
            </button>

            <form
              onSubmit={submitSignUp}
              className="flex flex-col w-3/4 gap-2 mt-8"
            >
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border"
                name="NameFirst"
                value={signupData.NameFirst}
                required
                onChange={handleSignupChange}
                placeholder="First Name"
              />
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border"
                name="NameLast"
                value={signupData.NameLast}
                required
                onChange={handleSignupChange}
                placeholder="Last Name"
              />
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border"
                type="email"
                name="email"
                value={signupData.email}
                required
                onChange={handleSignupChange}
                placeholder="Email"
              />
              <input
                className="bg-slate-200 rounded-lg px-4 py-2 border"
                type="password"
                name="Pass"
                value={signupData.Pass}
                required
                onChange={handleSignupChange}
                placeholder="Password"
              />
              <button
                type="submit"
                className="px-4 py-4 gap-2 mt-8 w-full bg-sky-200 rounded-lg text-white hover:bg-sky-300 transition duration-3"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
