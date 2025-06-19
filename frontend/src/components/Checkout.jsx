import React from 'react';

const Checkout = ({ cart, onPlaceOrder }) => {
  const handleCheckout = () => {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (!telegramUser) {
      alert('Вы не в Telegram');
      return;
    }

    if (cart.length === 0) {
      alert('Корзина пуста');
      return;
    }

    onPlaceOrder(telegramUser.id.toString());
  };

  return (
    <div>
      <button onClick={handleCheckout}>Оформить заказ</button>
    </div>
  );
};

export default Checkout;