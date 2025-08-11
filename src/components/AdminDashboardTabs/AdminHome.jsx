import React from 'react';
import '../../CSS/AdminDashboard/AdminSharedTabs.css';


const AdminHome = () => {
  return (
    <div className="admin-tab">
      <h1>Admin Dashboard Home</h1>
      <p>Welcome, Admin! Here's a quick overview.</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1234</p>
        </div>
        <div className="stat-card">
          <h3>Reports</h3>
          <p>56</p>
        </div>
        <div className="stat-card">
          <h3>Active Sessions</h3>
          <p>78</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
