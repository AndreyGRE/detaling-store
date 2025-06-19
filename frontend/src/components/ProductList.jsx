import React from "react";

const ProductList = ({ products, addToCart }) => {
    return (
        <div>
          
            <div className="flex flex-wrap gap-5 mt-6 max-w-7xl mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className=" rounded-xl p-3 
                                  bg-white 
                                    w-full  min-[28rem]:w-[calc(50%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] 
                                    shadow-sm hover:shadow-xl 
                                    transition fade-up animation-delay:.15s hover:scale-101
                                    flex flex-col justify-between gap-y-1"
                    >
                        <div className="relative pb-[100%] mb-3 overflow-hidden rounded-lg">
                            <img
                                src={product.imageUrl}
                                alt="фото"
                                class="absolute  h-full w-full rounded-lg object-cover"
                            ></img>
                        </div>

                        <p class="text-xs text-teal-600 "></p>
                        <p class="font-medium text-sm text-black ">
                            {product.name}
                        </p>
                        <p class="text-teal-500 font-semibold">
                            ₽ {product.price}
                        </p>
                        <button
                            className="add-to-cart mt-2 w-full py-1.5 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md"
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
