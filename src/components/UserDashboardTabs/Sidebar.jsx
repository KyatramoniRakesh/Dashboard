import React from 'react';
import '../../CSS/UserDashboard/Sidebar.css'
import { FaHome, FaBoxOpen, FaShoppingCart, FaHeart, FaUser, FaBell, FaCog, FaLifeRing } from 'react-icons/fa';

const ICON = {
  overview: <FaHome />,
  orders: <FaBoxOpen />,
  cart: <FaShoppingCart />,
  wishlist: <FaHeart />,
  profile: <FaUser />,
  notifications: <FaBell />,
  settings: <FaCog />,
  support: <FaLifeRing />
};

const Sidebar = ({ tabs, active, onChange }) => {
  return (
    <aside className="ud-sidebar">
      <div className="ud-brand">
        <div className="ud-logo">AP</div>
        <div className="ud-title">My Account</div>
      </div>

      <nav className="ud-nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`ud-nav-item ${active === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
            title={t.label}
          >
            <span className="icon">{ICON[t.id]}</span>
            <span className="label">{t.label}</span>
          </button>
        ))}
      </nav>

      <div className="ud-sidebar-footer">
        <small>Version 1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;
