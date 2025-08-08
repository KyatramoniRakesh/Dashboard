// src/pages/admin/Users.jsx
import React, { useEffect, useState } from 'react';

function loadUsers() {
  // Demo: read from localStorage 'users' or return sample
  const raw = localStorage.getItem('users');
  if (!raw) {
    const sample = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
      { id: 3, name: 'Rakesh', email: 'rakesh@example.com', role: 'admin' }
    ];
    localStorage.setItem('users', JSON.stringify(sample));
    return sample;
  }
  return JSON.parse(raw);
}

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const removeUser = (id) => {
    const filtered = users.filter(u => u.id !== id);
    setUsers(filtered);
    localStorage.setItem('users', JSON.stringify(filtered));
  };

  return (
    <div className="page-users">
      <h2 className="page-title">Users</h2>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
