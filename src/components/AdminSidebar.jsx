// src/components/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Icon = ({ name }) => {
  // small inline SVG icons (keeps UI crisp without libs)
  const icons = {
    dashboard: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" fill="currentColor"/></svg>),
    users: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM6 11c1.66 0 3-1.34 3-3S7.66 5 6 5 3 6.34 3 8s1.34 3 3 3zm10 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zM6 13c-2.67 0-8 1.34-8 4v3h8v-3c0-1.6 1.34-2.5 2.67-3.23C8.17 13.43 7.1 13 6 13z" fill="currentColor"/></svg>),
    reports: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 13h2v-2H3v2zm4 0h14V7H7v6zm0 8h14v-6H7v6zM3 21h2v-6H3v6z" fill="currentColor"/></svg>),
    settings: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19.14 12.936c.036-.304.06-.61.06-.936s-.024-.632-.07-.936l2.03-1.58a.5.5 0 0 0 .12-.66l-1.922-3.325a.5.5 0 0 0-.607-.22l-2.39.96a7.034 7.034 0 0 0-1.62-.936l-.36-2.54A.5.5 0 0 0 13.95 2h-3.9a.5.5 0 0 0-.497.424l-.36 2.54c-.58.22-1.12.51-1.62.936l-2.39-.96a.5.5 0 0 0-.607.22L1.71 8.794a.5.5 0 0 0 .12.66l2.03 1.58c-.046.304-.07.61-.07.936s.024.632.07.936l-2.03 1.58a.5.5 0 0 0-.12.66l1.922 3.325a.5.5 0 0 0 .607.22l2.39-.96c.5.426 1.04.716 1.62.936l.36 2.54a.5.5 0 0 0 .497.424h3.9a.5.5 0 0 0 .497-.424l.36-2.54c.58-.22 1.12-.51 1.62-.936l2.39.96a.5.5 0 0 0 .607-.22l1.922-3.325a.5.5 0 0 0-.12-.66l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" fill="currentColor"/></svg>)
  };
  return <span className="icon">{icons[name]}</span>;
};

const AdminSidebar = ({ collapsed, onToggle }) => {
  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand">
        <div className="brand-mark">AP</div>
        <div className="brand-name">AdminPanel</div>
        <button className="toggle-btn" onClick={onToggle} aria-label="toggle menu">☰</button>
      </div>

      <nav className="menu">
        <NavLink to="/admin" end className={({isActive}) => isActive ? 'menu-item active' : 'menu-item'}>
          <Icon name="dashboard" /> <span className="label">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className={({isActive}) => isActive ? 'menu-item active' : 'menu-item'}>
          <Icon name="users" /> <span className="label">Users</span>
        </NavLink>

        <NavLink to="/admin/reports" className={({isActive}) => isActive ? 'menu-item active' : 'menu-item'}>
          <Icon name="reports" /> <span className="label">Reports</span>
        </NavLink>

        <NavLink to="/admin/settings" className={({isActive}) => isActive ? 'menu-item active' : 'menu-item'}>
          <Icon name="settings" /> <span className="label">Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <a className="small-link" href="#" onClick={(e)=>e.preventDefault()}>Help</a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
