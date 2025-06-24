// store/useCartStore.js
import { create } from "zustand";

// Загружаем корзину из localStorage
const loadCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

// Сохраняем корзину в localStorage
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const useCartStore = create((set) => ({
    cart: loadCart(), // загружаем состояние из localStorage

    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.id === product.id
            );

            let newCart;
            if (existingItem) {
                newCart = state.cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [...state.cart, { ...product, quantity: 1 }];
            }

            saveCart(newCart); // сохраняем в localStorage
            return { cart: newCart };
        }),

    updateQuantity: (productId, newQuantity) =>
        set((state) => {
            if (newQuantity <= 0) {
                const newCart = state.cart.filter(
                    (item) => item.id !== productId
                );
                saveCart(newCart);
                return { cart: newCart };
            }

            const newCart = state.cart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.min(newQuantity, 10) } // максимум 10 шт.
                    : item
            );

            saveCart(newCart);
            return { cart: newCart };
        }),

    removeFromCart: (id) =>
        set((state) => {
            const newCart = state.cart.filter((item) => item.id !== id);
            saveCart(newCart);
            return { cart: newCart };
        }),

    clearCart: () =>
        set(() => {
            saveCart([]); // очищаем localStorage
            return { cart: [] };
        }),
}));

export default useCartStore;