import React from "react";

const ProductList = ({ products, addToCart }) => {
    return (
        <div>
            <h2>Товары</h2>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl p-3 shadow-sm hover:shadow-xl transition fade-up animation-delay:.15s hover:scale-101"
                    >
                        <img
                            src=".."
                            alt="фото"
                            class="h-32 w-full rounded-lg object-cover"
                        ></img>
                        <p class="text-xs text-teal-600 dark:text-teal-400"></p>
                        <p class="font-medium text-sm">{product.name}</p>
                        <p class="text-teal-500 font-semibold">
                            ₽{" "}{product.price}
                        </p>
                        <button
                            className="add-to-cart mt-2 w-full py-1.5 text-sm bg-teal-500 hover:bg-teal-600 text-white rounded-md"
                            onClick={() => addToCart(product)}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
