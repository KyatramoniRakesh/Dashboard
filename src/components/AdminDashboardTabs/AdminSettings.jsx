import React, { useState } from 'react';
import '../../CSS/AdminDashboard/AdminSharedTabs.css';


const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="admin-tab">
      <h1>Settings</h1>
      <label className="toggle-label">
        <input 
          type="checkbox" 
          checked={maintenanceMode} 
          onChange={() => setMaintenanceMode(!maintenanceMode)} 
        />
        Maintenance Mode
      </label>
      <p>{maintenanceMode ? "Maintenance mode is ON" : "Maintenance mode is OFF"}</p>
    </div>
  );
};

export default AdminSettings;
