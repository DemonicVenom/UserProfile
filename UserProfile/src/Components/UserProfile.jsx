import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="user-profile">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-group">
        <label>First Name:</label>
        <p>{user.firstName}</p>
      </div>

      <div className="profile-group">
        <label>Last Name:</label>
        <p>{user.lastName}</p>
      </div>

      <div className="profile-group">
        <label>Email:</label>
        <p>{user.email}</p>
      </div>

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
