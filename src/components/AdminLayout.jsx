// src/layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import '../CSS/Admin.css';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // On small screens, default collapsed true
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setCollapsed(mql.matches);
    const handler = (e) => setCollapsed(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  return (
    <div className={`admin-root ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="admin-main">
        <AdminTopBar onToggle={() => setCollapsed(!collapsed)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
