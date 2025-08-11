import React, { useState } from 'react';
import '../CSS/UserDashboard.css'; 

import Overview from '../components/UserDashboardTabs/Overview.jsx';
import Profile from '../components/UserDashboardTabs/Profile';
import Orders from '../components/UserDashboardTabs/Order';
import Settings from '../components/UserDashboardTabs/Settings.jsx'
import Support from '../components/UserDashboardTabs/Support.jsx';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'profile': return <Profile />;
      case 'orders': return <Orders />;
      case 'settings': return <Settings />;
      case 'support': return <Support />;
      default: return <Overview />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="dashboard-logo">User Dashboard</h2>
        <nav>
          <ul>
            <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
            <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
            <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
            <li className={activeTab === 'support' ? 'active' : ''} onClick={() => setActiveTab('support')}>Support</li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;
