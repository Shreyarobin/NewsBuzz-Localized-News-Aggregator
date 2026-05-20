import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const RoleManager = () => {
  const [userId, setUserId] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:4000/api/users/update-role",
        { userId, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Error updating role"));
    }
  };

  return (
    <div className="form-container">
      <h2>👑 Manage Roles (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <select onChange={(e) => setNewRole(e.target.value)}>
          <option>Select Role</option>
          <option>Reader</option>
          <option>Editor</option>
          <option>Admin</option>
        </select>
        <button type="submit">Update Role</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RoleManager;
