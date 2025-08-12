import React, { useState, useEffect } from 'react';
import '../../CSS/UserDashboard/Support.css';

const Support = () => {
  const [form, setForm] = useState({ subject:'', category:'general', message:'' });
  const [tickets, setTickets] = useState([]);

  useEffect(()=> setTickets(JSON.parse(localStorage.getItem('tickets')||'[]')), []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.subject || !form.message) return;
    const ticket = { id: Date.now(), ...form, status:'open', date: new Date().toISOString() };
    const next = [ticket, ...tickets];
    setTickets(next);
    localStorage.setItem('tickets', JSON.stringify(next));
    setForm({ subject:'', category:'general', message:'' });
  };

  return (
    <div className="ud-support">
      <h2>Support</h2>

      <form className="support-form" onSubmit={submit}>
        <input placeholder="Subject" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} required />
        <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
          <option value="general">General</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
        </select>
        <textarea placeholder="Describe issue" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required />
        <button className="primary">Submit Ticket</button>
      </form>

      <div className="tickets-list">
        <h3>Your tickets</h3>
        {tickets.length === 0 ? <div>No tickets</div> : (
          <ul>
            {tickets.map(t => <li key={t.id}><strong>{t.subject}</strong> <small>{t.status} • {new Date(t.date).toLocaleString()}</small></li>)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Support;
