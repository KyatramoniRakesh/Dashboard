import React, { useState, useEffect } from 'react';
// import '../CSS/UserDashboard/Wishlist.css';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  useEffect(() => setItems(JSON.parse(localStorage.getItem('wishlist') || '[]')), []);

  const remove = (id) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated); localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  if (!items.length) return <div className="ud-empty">Your wishlist is empty.</div>;

  return (
    <div className="ud-wishlist">
      <h2>Wishlist</h2>
      <ul className="wish-grid">
        {items.map(i => (
          <li key={i.id} className="wish-card">
            <img src={i.image || `https://via.placeholder.com/150`} alt="" />
            <div className="wish-meta">
              <div className="name">{i.name}</div>
              <div className="price">₹{i.price.toFixed(2)}</div>
              <div className="actions">
                <button onClick={() => { /* move to cart logic */ }}>Move to cart</button>
                <button onClick={() => remove(i.id)} className="danger">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
