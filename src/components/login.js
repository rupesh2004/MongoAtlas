import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6969/login", {
        email,
        password,
      });
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Failed to connect to the server");
      }
    }
  };

  const redirectToSignUp = () => {
    navigate('/signup');
  };

  const redirectToForgotPassword = () => {
    navigate('/forgot-password'); // Redirect to Forgot Password page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <p>
            <span onClick={redirectToForgotPassword} className="link">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgot Password?</span>
          </p>
          <br/>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <br/>

        <div className="login-links">
          <p>
            Don't have an account? <span onClick={redirectToSignUp} className="link">Sign Up</span>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
