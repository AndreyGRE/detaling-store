// src/components/Modal.jsx
import { useEffect } from "react";
import useCartStore from "../store/useCartStore";

export default function Modal({ isOpen, onClose }) {
    const { cart, clearCart, removeFromCart } = useCartStore();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(cart)

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

    // Не рендерим, если не открыт
    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 mx-4 max-h-[90vh] overflow-y-auto flex flex-col">
                <div class="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 class="font-semibold text-3xl text-black">Корзина</h2>
                    <button
                        className="text-black text-5xl hover:text-shadow-lg "
                        id="closeCart"
                        aria-label="Close cart"
                        onClick={() => onClose()}
                    >
                        &times;
                    </button>
                </div>

                <div
                    id="cartItems"
                    class="flex-1 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800 text-black text-xl my-3 font-semibold" 
                >
                    {console.log(cart)}
                    {cart.length > 0
                        ? cart.map((item) => {
                              return (
                                 <>
                                    <div>{item.name}</div>
                                    <div>{item.quantity}</div>
                                </>
                              )
                             
                          })
                        : <div className="">В корзине пусто(...</div>}

                </div>
                {cart.length > 0? <button onClick={()=> clearCart()}  className=" self-end max-w-76 mb-3 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">Очистить корзину</button> : ''}
                

                <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center flex-col">
                    <div class="flex items-center justify-end mb-4 text-black gap-3 font-semibold">
                        <span className="text-2xl">Итог:</span>
                        <span
                            id="cartTotal"
                            class="text-teal-600 dark:text-teal-400 font-semibold text-2xl"
                        >
                            ₽ 0
                        </span>
                    </div>
                    <button class=" self-center max-w-96 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
}
