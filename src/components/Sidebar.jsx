import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen bg-gray-900 text-white p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white'}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white'}>Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reports" className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white'}>Reports</NavLink>
          </li>
          <li>
            <NavLink to="/" className="text-red-400">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;