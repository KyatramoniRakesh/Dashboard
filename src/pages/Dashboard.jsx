// src/pages/admin/Dashboard.jsx
import React from 'react';

const StatCard = ({ title, value, delta }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
    <div className={`stat-delta ${delta >= 0 ? 'up' : 'down'}`}>
      {delta >= 0 ? `+${delta}%` : `${delta}%`}
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="page-dashboard">
      <h2 className="page-title">Overview</h2>
      <div className="stats-grid">
        <StatCard title="Active Users" value="1,245" delta={6.4} />
        <StatCard title="Monthly Revenue" value="$24,860" delta={3.2} />
        <StatCard title="Open Tickets" value="27" delta={-8.1} />
        <StatCard title="New Signups" value="190" delta={12.1} />
      </div>

      <section className="panel">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li>New user <strong>ana@example.com</strong> signed up.</li>
          <li>Order #<strong>7821</strong> placed by <strong>mark@example.com</strong>.</li>
          <li>Monthly report generated.</li>
        </ul>
      </section>
    </div>
  );
}
