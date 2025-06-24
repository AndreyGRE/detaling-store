
import React, { useEffect } from "react";
import useCartStore from "../store/useCartStore";
import CartItem from "./CartItem";

export default function Modal({ isOpen, onClose }) {
    const { cart, clearCart } = useCartStore();

    // Подсчёт общей суммы
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative w-full max-w-2xl  bg-zinc-50 rounded-2xl shadow-xl p-6 mx-4 max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 className="font-semibold text-3xl text-black">Корзина</h2>
                    <button
                        className="text-black text-5xl hover:text-gray-700"
                        aria-label="Close cart"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                {/* Cart Items */}
                <div
                    id="cartItems"
                    className="flex-1 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800 my-3"
                >
                    {cart.length > 0 ? (
                        cart.map((item) => <CartItem key={item.id} item={item} />)
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            В корзине пусто...
                        </div>
                    )}
                </div>

                {/* Clear Cart Button */}
                {cart.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="self-end max-w-76 mb-3 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium tracking-tight transition-transform duration-100 transform active:-translate-y-1"
                    >
                        Очистить корзину
                    </button>
                )}

                {/* Footer with Total and Checkout */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col">
                    <div className="flex items-center justify-end mb-4 text-black gap-3 font-semibold">
                        <span className="text-2xl">Итог:</span>
                        <span className="text-teal-600 font-semibold text-2xl">
                            ₽ {total.toFixed(0)}
                        </span>
                    </div>
                    <button className="self-center max-w-96 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 transition-transform duration-100 transform active:-translate-y-1">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
}