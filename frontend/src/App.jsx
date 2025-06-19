import React, { useState, useEffect } from 'react';

import ProductList from './components/ProductList';

function App() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }  
        };
        fetchProducts();
    }, []);
    
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

    // const removeFromCart = (id) => {
    //     setCart((prev) => prev.filter((p) => p.id !== id));
    // };

    // const placeOrder = async (userId) => {
    //     for (const item of cart) {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/orders/place', {
    //                 method: 'POST',
    //                 headers: {
    //                 'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                 productId: item.id,
    //                 quantity: item.quantity,
    //                 userId,
    //                 }),
    //             });

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const data = await response.json();
    //             console.log(data); // Обработка ответа от сервера
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }

    //     setCart([]);
    //     alert('Заказ оформлен!');
    // };

    

    return (
        <div className='p-5 '>
            <h1 className=''>bvz</h1>
            <ProductList products={products} addToCart={addToCart} />

            {/* <Cart cart={cart} removeFromCart={removeFromCart} /> */}
            {/* <Checkout cart={cart} onPlaceOrder={placeOrder} /> */}
        </div>
    );
}

export default App;