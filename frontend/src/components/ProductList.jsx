import React from "react";
import Product from '../components/Product'

const ProductList = ({products}) => {
    return (
        <div className="flex flex-wrap gap-5 mt-6 max-w-7xl mx-auto">
            {products.map((product) => (
                <Product product={product} />
            ))}
        </div>
    );
};

export default ProductList;
