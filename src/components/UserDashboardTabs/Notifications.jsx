import React, { useState, useEffect } from 'react';
import "../../CSS/UserDashboard/Notifications.css";

const Notifications = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => setNotes(JSON.parse(localStorage.getItem('notifications') || '[]')), []);

  const markRead = (i) => {
    const updated = notes.map((n, idx) => idx === i ? { ...n, read: true } : n);
    setNotes(updated); localStorage.setItem('notifications', JSON.stringify(updated));
  };

  if (!notes.length) return <div className="ud-empty">No notifications.</div>;

  return (
    <div className="ud-notifications">
      <h2>Notifications</h2>
      <ul>
        {notes.map((n, idx) => (
          <li key={idx} className={n.read ? 'read' : ''}>
            <div>{n.title}</div>
            <small>{n.body}</small>
            {!n.read && <button onClick={() => markRead(idx)}>Mark read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
