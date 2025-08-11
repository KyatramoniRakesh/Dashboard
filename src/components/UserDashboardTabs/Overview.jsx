import React from 'react';
import  "../../CSS/Overview.css"

const Overview = () => {
  return (
    <div className="overview">
      <h1>Welcome back, User!</h1>
      <p>Here's a quick glance at your recent activity and stats.</p>
      {/* Add some cards or stats */}
      <div className="stats-cards">
        <div className="card">
          <h3>Orders</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Pending Support Tickets</h3>
          <p>2</p>
        </div>
        <div className="card">
          <h3>Profile Completeness</h3>
          <p>80%</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
