import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../CSS/DashboardLayout.css';

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`dashboard${sidebarOpen ? ' sidebar-open' : ''}`}>
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <h2 className="logo">AdminPanel</h2>
        <nav className="nav-links">
          <Link
            to="/dashboard"
            className={pathname === '/dashboard' ? 'active' : ''}
            onClick={closeSidebar}
          >🏠 Dashboard</Link>
          <Link
            to="/dashboard/users"
            className={pathname === '/dashboard/users' ? 'active' : ''}
            onClick={closeSidebar}
          >👤 Users</Link>
          <Link
            to="/dashboard/reports"
            className={pathname === '/dashboard/reports' ? 'active' : ''}
            onClick={closeSidebar}
          >📊 Reports</Link>
        </nav>
      </aside>

      {/* Hamburger Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Open or close sidebar"
      >
        <span />
        <span />
        <span />
      </button>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

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
