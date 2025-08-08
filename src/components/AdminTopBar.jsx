// src/components/AdminTopbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = ({ onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-topbar">
      <div className="left">
        <button className="hamburger" onClick={onToggle} aria-label="open menu">☰</button>
        <div className="search">
          <input placeholder="Search..." />
        </div>
      </div>

      <div className="right">
        <button className="icon-btn" title="Notifications">🔔</button>
        <div className="profile" title={user?.email}>
          <img src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.email}`} alt="avatar" />
          <div className="profile-info">
            <div className="name">{user?.name || user?.email}</div>
            <div className="role">{user?.role || 'admin'}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default AdminTopbar;
