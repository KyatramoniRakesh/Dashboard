import React, { useState, useEffect } from 'react';
import "../CSS/UserDashboard.css";

import Sidebar from '../components/UserDashboardTabs/Sidebar';
import Topbar from '../components/UserDashboardTabs/Topbar';

import Overview from '../components/UserDashboardTabs/Overview';
import Profile from '../components/UserDashboardTabs/Profile';
import Orders from '../components/UserDashboardTabs/Order';
import Wishlist from '../components/UserDashboardTabs/Wishlist';
import Cart from '../components/UserDashboardTabs/Cart';
import Notifications from '../components/UserDashboardTabs/Notifications';
import Settings from '../components/UserDashboardTabs/Settings';
import Support from '../components/UserDashboardTabs/Support';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders', label: 'Orders' },
  { id: 'cart', label: 'Cart' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'settings', label: 'Settings' },
  { id: 'support', label: 'Support' },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('ud_activeTab') || 'overview');

  useEffect(() => {
    localStorage.setItem('ud_activeTab', activeTab);
  }, [activeTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'orders': return <Orders />;
      case 'cart': return <Cart />;
      case 'wishlist': return <Wishlist />;
      case 'profile': return <Profile />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
      case 'support': return <Support />;
      default: return <Overview />;
    }
  };

  return (
    <div className="ud-root">
      <Sidebar tabs={TABS} active={activeTab} onChange={setActiveTab} />
      <div className="ud-main">
        <Topbar onSearch={(q) => console.log('search:', q)} />
        <main className="ud-content">
          {renderTab()}
        </main>
      </div>

     
    </div>
  );
};

export default UserDashboard;
