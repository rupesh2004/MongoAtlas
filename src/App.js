import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login.js';  // Add the .js extension
import SignUp from './components/signup.js';  // Add the .js extension
import ForgotPassword from "./components/forgotPassword.js"
import UserDetails from './components/userDetails.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} /> {/* Using element prop */}
          <Route path="/signup" element={<SignUp />} /> {/* Using element prop */}
          <Route path= "/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
