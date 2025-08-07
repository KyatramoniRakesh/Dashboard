import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../CSS/DashboardLayout.css';

const DashboardLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">AdminPanel</h2>
        <nav className="nav-links">
          <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>🏠 Dashboard</Link>
          <Link to="/dashboard/users" className={pathname === '/dashboard/users' ? 'active' : ''}>👤 Users</Link>
          <Link to="/dashboard/reports" className={pathname === '/dashboard/reports' ? 'active' : ''}>📊 Reports</Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <span className="page-title">
            {pathname === '/dashboard' && 'Dashboard'}
            {pathname === '/dashboard/users' && 'Users'}
            {pathname === '/dashboard/reports' && 'Reports'}
          </span>
        </header>

        <section className="content-area">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
