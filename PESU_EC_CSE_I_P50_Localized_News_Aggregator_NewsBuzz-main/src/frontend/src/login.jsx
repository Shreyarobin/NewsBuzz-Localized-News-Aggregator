import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Show success message
      setMessage("✅ Login Successful!");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (error) {
      setMessage("❌ Invalid credentials or server error.");
    }
  };

  return (
    <div className="form-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>
        Don&apos;t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
