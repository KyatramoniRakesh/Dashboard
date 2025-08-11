import React from 'react';
import  "../../CSS/UserDashboard/Orders.css"

const Orders = () => {
  // Sample orders data
  const orders = [
    { id: 'ORD1234', date: '2025-08-01', status: 'Delivered', total: 150.0 },
    { id: 'ORD1235', date: '2025-07-21', status: 'Processing', total: 89.99 },
    { id: 'ORD1236', date: '2025-07-10', status: 'Cancelled', total: 29.99 },
  ];

  return (
    <div className="orders-tab">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, date, status, total }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td className={`status ${status.toLowerCase()}`}>{status}</td>
                <td>{total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
