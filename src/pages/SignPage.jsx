import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user', // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (existingUsers.some((u) => u.email === form.email)) {
      alert('User already exists! Please login.');
      return;
    }

    // Save the new user
    const newUser = {
      email: form.email,
      password: form.password,
      role: form.role, // store role
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    alert('Signup successful! Now login.');
    navigate('/login');
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option> {/* For testing purposes */}
        </select>
        <br /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
