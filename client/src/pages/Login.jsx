import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const submitLogin = async () => {
    return;
  };

  // const

  return (
    <div>
      <p>login test </p>
      <form onSubmit={submitLogin}>
        <input
          class="bg-slate-200"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          class="bg-slate-200"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      <p>create account</p>
      {/* <p>emai</p> */}
    </div>
  );
};

export default Login;
