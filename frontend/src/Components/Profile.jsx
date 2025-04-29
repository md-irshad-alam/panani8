import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { api } from "../constants/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  // Fetch user data
  useEffect(() => {
    axios
      .get(`${api}/user/getUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
        });
      })
      .catch((err) => console.error("Error fetching user:", err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Update user data
  const handleUpdate = () => {
    axios
      .put(`${api}/user/updateUser/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2 style={{ textAlign: "center" }} className="text-2xl font-semibold pb-4">User Profile</h2>

      {!editMode ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Username"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
