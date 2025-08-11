import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/SignPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
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

    if (existingUsers.some((u) => u.email === form.email)) {
      alert('User already exists! Please login.');
      return;
    }

    const newUser = {
      email: form.email,
      password: form.password,
      role: form.role,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    alert('Signup successful! Now login.');
    navigate('/login');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <h1>Join Us</h1>
        <p>Create your account to explore all features.</p>
      </div>
      <div className="signup-right">
        <div className="glass-signup">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <div className="input-group-signup">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group-signup">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="input-group-signup">
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <label>Role</label>
            </div>

            <button className="signup-btn" type="submit">
              Create Account
            </button>

            <p>Already have an account? <a href="/login">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
