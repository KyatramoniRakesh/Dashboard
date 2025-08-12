import React, { useState, useEffect } from 'react';
import '../../CSS/UserDashboard/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // read from localStorage (replace with API)
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
  }, []);

  if (!orders.length) {
    return <div className="ud-empty">You have no orders yet.</div>;
  }

  return (
    <div className="ud-orders">
      <h2>Your Orders</h2>
      <table className="ud-table">
        <thead><tr><th>Order</th><th>Date</th><th>Status</th><th>Total</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.date}</td>
              <td className={`status ${o.status?.toLowerCase()}`}>{o.status}</td>
              <td>₹{(o.total||0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
