import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Component for user control panel
const UserControlPanel = () => {
  const navigate = useNavigate();

  // State management
  const [users, setUsers] = useState([]);
  const [userRole] = useState(localStorage.getItem("userRole"));

  // Fetch all users when userRole changes
  useEffect(() => {
    fetchAllUsers();
  }, [userRole]);

  // Function to fetch all users from the server
  const fetchAllUsers = async () => {
    // Check if user is admin
    if (userRole === "admin") {
      try {
        // Fetch users data from the server
        const response = await axios.get("http://localhost:8000/api/user");
        setUsers(response.data);
      } catch (error) {
        console.log("error fetch user", error);
      }
    } else {
      alert("You don't have permission!");
    }
  };

  // Function to change user role
  const changeUserRole = async (userId, currentRole) => {
    // Check if user is admin
    if (userRole !== "admin") {
      alert("You don't have permission!");
      return;
    }
    // Determine new role based on current role
    const newRole = currentRole === "admin" ? "normal" : "admin";
    try {
      // Send request to update user role
      await axios.put("http://localhost:8000/api/user/role", {
        userId,
        newRole,
      });
      // Alert user role update success
      alert("User role updated!");
      // Fetch updated user list
      await fetchAllUsers();
    } catch (error) {
      // Alert user role update failure
      alert("Error updated the user role", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove userRole from localStorage
    localStorage.removeItem("userRole");
    // Redirect user to BlogScreen after logout
    return <Link to="/BlogScreen" />;
  };

  return (
    <div>
      {/* Render user list and role change button */}
      {userRole === "admin" ? (
        users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.username}
                <br />
                {user.role}
                <button onClick={() => changeUserRole(user._id, user.role)}>
                  Change role to {user.role === "admin" ? "normal" : "admin"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>User not found!</p>
        )
      ) : (
        <p>You don't have permission</p>
      )}
      {/* Add logout button */}
      <button onClick={() => navigate("/BlogScreen")}>Home</button>
    </div>
  );
};

export default UserControlPanel;
