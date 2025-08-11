
import React from 'react';
import '../../CSS/AdminDashboard/AdminSharedTabs.css';


const AdminReports = () => {
  // Static sample reports
  const reports = [
    { id: 1, title: 'User Feedback', date: '2025-08-10' },
    { id: 2, title: 'Bug Report', date: '2025-08-09' },
  ];

  return (
    <div className="admin-tab">
      <h1>Reports</h1>
      <ul className="reports-list">
        {reports.map(r => (
          <li key={r.id}>
            <strong>{r.title}</strong> <span>({r.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReports;
