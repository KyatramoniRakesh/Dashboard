import React, { useState } from 'react';
import AdminHome from '../components/AdminDashboardTabs/AdminHome'
import AdminUsers from '../components/AdminDashboardTabs/AdminUsers'
import AdminReports from '../components/AdminDashboardTabs/AdminReports'
import AdminSettings from '../components/AdminDashboardTabs/AdminSettings'
import AdminProducts from '../components/AdminDashboardTabs/AdminProducts';
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'users': return <AdminUsers />;
      case 'products': return <AdminProducts />;
      case 'reports': return <AdminReports />;
      case 'settings': return <AdminSettings />;
      case 'home':
      default: return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Dashboard</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Manage Users</li>
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
        </ul>
      </nav>

      <main className="admin-content">
        {renderTab()}
      </main>
    </div>
  );
};

export default AdminDashboard;
