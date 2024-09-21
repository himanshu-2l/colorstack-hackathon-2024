import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    NameFirst: "",
    NameLast: "",
    email: "",
    Pass: "",
    Admin: false
  });
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({ ...prevState, [name]: value }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', {
        email: credentials.email,
        Pass: credentials.password
      });
      console.log(res.data);
 
      navigate('/');
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
    }
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/register', signupData);
      console.log(res.data);
      console.log("Signed up")
      navigate('/login');
    } catch (error) {
      console.error("Signup Failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {isLoggingIn ? (
        <>
          <p>Login form</p>
          <form onSubmit={submitLogin}>
            <input
              className="bg-slate-200"
              type="email"
              name="email"
              value={credentials.email}
              required
              onChange={handleLoginChange}
              placeholder="Email"
            />
            <input
              className="bg-slate-200"
              type="password"
              name="password"
              value={credentials.password}
              required
              onChange={handleLoginChange}
              placeholder="Password"
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setIsLoggingIn(false)}>Switch to Sign Up</button>
        </>
      ) : (
        <>
          <p>Create account</p>
          <form onSubmit={submitSignUp}>
            <input
              className="bg-slate-200"
              name="NameFirst"
              value={signupData.NameFirst}
              required
              onChange={handleSignupChange}
              placeholder="First Name"
            />
            <input
              className="bg-slate-200"
              name="NameLast"
              value={signupData.NameLast}
              required
              onChange={handleSignupChange}
              placeholder="Last Name"
            />
            <input
              className="bg-slate-200"
              type="email"
              name="email"
              value={signupData.email}
              required
              onChange={handleSignupChange}
              placeholder="Email"
            />
            <input
              className="bg-slate-200"
              type="password"
              name="Pass"
              value={signupData.Pass}
              required
              onChange={handleSignupChange}
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </form>
          <button onClick={() => setIsLoggingIn(true)}>Switch to Login</button>
        </>
      )}
    </div>
  );
};

export default Login;
