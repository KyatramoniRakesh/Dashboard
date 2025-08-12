import React, { useState } from 'react';
import '../../CSS/UserDashboard/Topbar.css';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onSearch }) => {
  const [q, setQ] = useState('');
  const { user, logout } = useAuth();

  return (
    <header className="ud-topbar">
      <div className="left">
        <div className="search">
          <FaSearch className="search-icon" />
          <input
            placeholder="Search orders, products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(q)}
          />
        </div>
      </div>

      <div className="right">
        <button className="icon-btn" title="Notifications"><FaBell /></button>
        <div className="profile" title={user?.email}>
          <img src={user?.avatar || `https://ui-avatars.com/api/?name=U+R&size=40=${user?.email}`} alt="avatar" />
          <div className="info">
            <div className="name">{user?.name || user?.email}</div>
            <div className="role">{user?.role || 'User'}</div>
          </div>
        </div>
        <button className="logout" onClick={() => logout()}>Sign out</button>
      </div>
    </header>
  );
};

export default Topbar;
