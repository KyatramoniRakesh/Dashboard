import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../CSS/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = 'Invalid email format';
    }
    if (!form.password) {
      formErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedUser = existingUsers.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (storedUser) {
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      login({ email: storedUser.email, role: storedUser.role });
      if (storedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert('Invalid credentials or user not found');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Sign in to access your dashboard and manage everything in one place.</p>
      </div>
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form glass">
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="username"
            />
            <label>Email</label>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" " 
              autoComplete="current-password"
            />
            <label>Password</label>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
