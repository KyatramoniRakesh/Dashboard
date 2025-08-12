import React, { useEffect, useState } from 'react';
import '../../CSS/UserDashboard/Overview.css';

const Overview = () => {
  // demo dynamic counts (would come from API)
  const [stats, setStats] = useState({ orders: 0, wishlist: 0, profileComplete: 0, tickets: 0 });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]').length;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]').length;
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]').length;
    const profile = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const profileComplete = profile && profile.email ? 80 : 20;
    setStats({ orders, wishlist, profileComplete, tickets });
  }, []);

  return (
    <section className="ud-overview">
      <div className="welcome">
        <h1>Welcome back</h1>
        <p>Quick overview of your account</p>
      </div>

      <div className="cards">
        <div className="stat-card">
          <div className="title">Orders</div>
          <div className="value">{stats.orders}</div>
        </div>
        <div className="stat-card">
          <div className="title">Wishlist</div>
          <div className="value">{stats.wishlist}</div>
        </div>
        <div className="stat-card">
          <div className="title">Support Tickets</div>
          <div className="value">{stats.tickets}</div>
        </div>
        <div className="stat-card">
          <div className="title">Profile</div>
          <div className="value">{stats.profileComplete}%</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent activity</h3>
        <ul>
          <li>Placed order <strong>#ORD1234</strong></li>
          <li>Updated profile</li>
          <li>Opened support ticket</li>
        </ul>
      </div>
    </section>
  );
};

export default Overview;
