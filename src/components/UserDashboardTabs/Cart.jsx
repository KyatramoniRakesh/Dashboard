import React, { useState, useEffect } from 'react';
// import "../../CSS/UserDashboard/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => setCart(JSON.parse(localStorage.getItem('cart') || '[]')), []);

  const changeQty = (id, delta) => {
    const updated = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
    setCart(updated); localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id) => {
    const updated = cart.filter(i => i.id !== id);
    setCart(updated); localStorage.setItem('cart', JSON.stringify(updated));
  };

  if (!cart.length) return <div className="ud-empty">Your cart is empty.</div>;

  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  return (
    <div className="ud-cart">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map(i => (
          <li key={i.id} className="cart-item">
            <div className="meta">
              <img src={i.image||`https://via.placeholder.com/60?text=${i.name[0]}`} alt="" />
              <div>
                <div className="name">{i.name}</div>
                <div className="price">₹{i.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="controls">
              <button onClick={() => changeQty(i.id, -1)}>-</button>
              <span>{i.qty}</span>
              <button onClick={() => changeQty(i.id, +1)}>+</button>
              <button className="remove" onClick={() => remove(i.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="checkout">
        <div>Subtotal: <strong>₹{subtotal.toFixed(2)}</strong></div>
        <button className="primary">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
