import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../backend";

export interface CartItem {
  product: Product;
  quantity: number;
  ringSize?: string;
  metalColour?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    ringSize?: string,
    metalColour?: string,
    quantity?: number,
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, ringSize, metalColour, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.ringSize === ringSize &&
              item.metalColour === metalColour,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.ringSize === ringSize &&
                item.metalColour === metalColour
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, ringSize, metalColour },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total + Number(item.product.priceInCents) * item.quantity,
          0,
        );
      },
    }),
    {
      name: "aurelie-cart-storage",
    },
  ),
);
