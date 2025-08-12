import React, { useState, useEffect } from 'react';
import '../../CSS/UserDashboard/Settings.css';

const Settings = () => {
  const [prefs, setPrefs] = useState({ theme: 'light', emailNotif: true });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ud_prefs') || '{}');
    if (saved.theme) setPrefs(saved);
  }, []);

  const update = (k, v) => {
    const next = { ...prefs, [k]: v };
    setPrefs(next);
    localStorage.setItem('ud_prefs', JSON.stringify(next));
    // apply theme class to body
    document.documentElement.setAttribute('data-theme', next.theme);
  };

  return (
    <div className="ud-settings">
      <h2>Settings</h2>
      <div className="setting-row">
        <div>
          <strong>Theme</strong>
          <div className="muted">Choose light or dark</div>
        </div>
        <div>
          <select value={prefs.theme} onChange={(e) => update('theme', e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="setting-row">
        <div><strong>Email notifications</strong><div className="muted">Enable announcement emails</div></div>
        <div><input type="checkbox" checked={prefs.emailNotif} onChange={(e)=>update('emailNotif', e.target.checked)} /></div>
      </div>
    </div>
  );
};

export default Settings;
