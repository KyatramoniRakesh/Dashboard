// src/pages/admin/Reports.jsx
import React from 'react';

export default function Reports() {
  return (
    <div className="page-reports">
      <h2 className="page-title">Reports</h2>

      <div className="panel">
        <h3>Export</h3>
        <p>Export data to CSV / PDF (placeholder)</p>
        <div className="actions">
          <button className="btn">Export CSV</button>
          <button className="btn">Export PDF</button>
        </div>
      </div>

      <div className="panel">
        <h3>Analytics</h3>
        <p>Placeholder for charts — integrate Chart.js or Recharts here.</p>
      </div>
    </div>
  );
}
