'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

export type CartItem = Product & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bonda-cart');
      if (raw) setItems(JSON.parse(raw));
    } catch (error) {
      console.warn('Unable to load cart from localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bonda-cart', JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.quantity * Number(item.price.replace(/[^0-9.]/g, '')), 0), [items]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.slug === slug ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
