import React, { useState, useEffect } from 'react';

import ProductList from './components/ProductList';
import SerchSort from './components/SerchSort'
import ShoppingCart from './components/ShoppingCart';
import useShoppingCartIsOpen from './store/useShoppingCartIsOpen';
import useSearchProd from './store/useSearchProd'

function App() {
    const { searchProd } = useSearchProd()
    const { isOpen, Close }  = useShoppingCartIsOpen();
    // const [products, setProducts] = useState([]);

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
    
    
    return (
        <>
            <SerchSort/>
            <ProductList products={searchProd} />
            <ShoppingCart isOpen={isOpen} onClose={()=>{ Close() }}/>
        </>

    );
}

export default App;