import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submitLogin = async () => {
    return;
  };

  const submitSignUp = async () => {
    return;
  };

  // const

  return (
    <div>
      <p>login form</p>
      <form onSubmit={submitLogin}>
        <input
          class="bg-slate-200"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          class="bg-slate-200"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Submit" />
      </form>

      <p>create account</p>
      <form onSubmit={submitSignUp}>
        <input
          class="bg-slate-200"
          value={firstName}
          required
          onChange={(e) => firstName(e.target.value)}
          placeholder="First Name"
        />

        <input
          class="bg-slate-200"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />

        <input
          class="bg-slate-200"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          class="bg-slate-200"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
