import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="profile-page">
      <div className="card">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
