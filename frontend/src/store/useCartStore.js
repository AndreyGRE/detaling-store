// store/useCartStore.js
import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],

    // Добавление товара с учетом существующего количества
    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    cart: [...state.cart, { ...product, quantity: 1 }],
                };
            }
        }),

    // Изменение количества товара
    updateQuantity: (productId, newQuantity) =>
        set((state) => {
            if (newQuantity <= 0) {
                return {
                    cart: state.cart.filter((item) => item.id !== productId),
                };
            }

            return {
                cart: state.cart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                ),
            };
        }),

    // Удаление товара из корзины
    removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

    // Очистка корзины
    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;