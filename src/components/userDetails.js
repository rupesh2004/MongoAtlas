import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const email = localStorage.getItem("userEmail"); // Get the logged-in email from localStorage
  const navigate = useNavigate();
  useEffect(() => {
    if (email) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:6969/user/${email}`
          );
          setUser(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserDetails();
    } else {
      setError("No user email found. Please log in.");
    }
  }, [email]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:6969/user/${email}`
      );
      alert(response.data.message);
      navigate('/')
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <h2>User Details</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {user && (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <br />

          <p>
            <strong>Full Name:</strong> {user.name}
          </p>
          <br />

          <p>
            <strong>Password:</strong> {user.password}
          </p>
          <br />

          <p>
            <strong>ID:</strong> {user._id}
          </p>
          {/* Add more details based on your user schema */}
        </div>
      )}
      <br />
      {/* add delete button */}
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Delete User
      </button>
    </div>
  );
};

export default UserDetails;
