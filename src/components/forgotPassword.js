import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:6969/forgot-password", {
        email,
        newPassword,
      });

      setMessage(response.data.message);  // Success message
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const redirectToLogin = ()=>{
    navigate('/')
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
            <br/>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter your new password"
          />
<br/>
<br/>

        </div>
        <button type="submit">Reset Password</button>
      </form>
      <br/>
      <div className="login-links">
          <p>
            Don't have an account? <span onClick={redirectToLogin} className="link">Sign Up</span>
          </p>
          
        </div>
      <br/>

      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ForgotPassword;
