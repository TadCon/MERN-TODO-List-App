import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginRequest from "../../api/loginRequest";
import "./LoginPage.css";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>Contraseña provisional:</h3>
      <h3>abc</h3>
      <div className="error">{error}</div>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
