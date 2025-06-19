import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 && <p>Корзина пуста</p>}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} — {item.price * item.quantity} ₽
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 10 }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;