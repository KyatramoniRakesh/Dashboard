// src/pages/dashboardTabs/Support.jsx
import React, { useState } from 'react';
import  "../../CSS/UserDashboard/Support.css"

const Support = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Here you could send this message to a backend or service
    setSubmitted(true);
  };

  return (
    <div className="support-tab">
      <h1>Support & Help</h1>

      {!submitted ? (
        <form className="support-form" onSubmit={handleSubmit}>
          <label htmlFor="message">Describe your issue or question:</label>
          <textarea
            id="message"
            rows="6"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you">
          <h2>Thank you for reaching out!</h2>
          <p>Our support team will get back to you shortly.</p>
          <button className="btn-new" onClick={() => { setMessage(''); setSubmitted(false); }}>
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
};

export default Support;
