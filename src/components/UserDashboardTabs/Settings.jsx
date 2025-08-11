import React, { useState } from 'react';
import '../../CSS/UserDashboard/Settings.css';


const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const toggleNotification = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
   <div className="settings-tab">
  <h1>Settings</h1>
  <div className="notification-option">
    <label>
      <input
        type="checkbox"
        checked={notifications.email}
        onChange={() => toggleNotification('email')}
      />
      Email Notifications
    </label>
  </div>
  <div className="notification-option">
    <label>
      <input
        type="checkbox"
        checked={notifications.sms}
        onChange={() => toggleNotification('sms')}
      />
      SMS Notifications
    </label>
  </div>
</div>

  );
};

export default Settings;
