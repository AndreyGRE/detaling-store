import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
const [cart, setCart] = useState([]);
const [products, setProducts] = useState([]);

const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
};

const addToCart = (product) => {
    setCart((prev) => {
    const itemInCart = prev.find((p) => p.id === product.id);
    if (itemInCart) {
        return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
    } else {
        return [...prev, { ...product, quantity: 1 }];
    }
    });
};

const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
};

const placeOrder = async (userId) => {
    for (const item of cart) {
    await axios.post('http://localhost:5000/api/orders/place', {
        productId: item.id,
        quantity: item.quantity,
        userId,
    });
    }
    setCart([]);
    alert('Заказ оформлен!');
};

useEffect(() => {
    fetchProducts();
}, []);

return (
    <div style={{ padding: 20 }}>
    <h1>Автодетейлинг Магазин</h1>

    <ProductList products={products} addToCart={addToCart} />

    <hr />

    <Cart cart={cart} removeFromCart={removeFromCart} />

    <hr />

    <Checkout cart={cart} onPlaceOrder={placeOrder} />
    </div>
);
}

export default App;