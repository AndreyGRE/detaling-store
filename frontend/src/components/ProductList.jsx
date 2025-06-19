import React from 'react';

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h2>Товары</h2>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: 10 }}>
            <h3>{product.name}</h3>
            <p>{product.price} ₽</p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;