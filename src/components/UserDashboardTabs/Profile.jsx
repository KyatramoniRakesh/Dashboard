import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../CSS/UserDashboard/Profile.css';

const Profile = () => {
  const { user, login } = useAuth();

  // Initialize profile from current user or default empty object
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);

  // On user change or load, sync profile & form states
  useEffect(() => {
    if (user) {
      // If user has no 'name' or 'phone' you can default to empty strings
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(form);
    setEditMode(false);

    // Update user info in auth context and localStorage
    const updatedUser = { ...user, ...form };
    login(updatedUser); // Update auth context with new data
    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Persist changes
  };

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="profile-tab">
      <h1>Your Profile</h1>
      {!editMode ? (
        <>
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
          </div>
          <button className="btn-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      ) : (
        <form className="profile-form" onSubmit={handleSave}>
          <label>
            Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <div className="btn-group">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
