import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (!email || !password || !name) {
      setError('Name, email, and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:6969/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("Sign Up Successful");
        navigate('/');  // Redirect to home or login page
      } else {
        const result = await response.json();
        setError(result.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Error creating account');
    }
  };

  const redirectToLogin = () => {
    navigate('/');  // Redirect to the login page
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>

        <div className="already-have-account">
          <p>Already have an account? <span onClick={redirectToLogin} className="link">Log In</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
