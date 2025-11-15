'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalCarbonSaved: () => number;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecoconnect_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('ecoconnect_cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      
      if (existingItem) {
        // Update quantity if item already in cart
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
    });

    // Show success notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('cart-updated', { 
        detail: { 
          action: 'add', 
          productName: product.name,
          quantity 
        } 
      });
      window.dispatchEvent(event);
    }
  };

  const removeFromCart = (productId: string) => {
    const item = items.find(i => i._id === productId);
    setItems((prevItems) => prevItems.filter((item) => item._id !== productId));

    // Show notification
    if (typeof window !== 'undefined' && item) {
      const event = new CustomEvent('cart-updated', { 
        detail: { 
          action: 'remove', 
          productName: item.name 
        } 
      });
      window.dispatchEvent(event);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('cart-updated', { 
        detail: { action: 'clear' } 
      });
      window.dispatchEvent(event);
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalCarbonSaved = () => {
    // Calculate carbon saved compared to conventional products
    // Assuming eco products save 50% carbon on average
    return items.reduce((total, item) => {
      const conventionalCarbon = item.carbonFootprint.total * 2; // Conventional product would be 2x
      const saved = conventionalCarbon - item.carbonFootprint.total;
      return total + (saved * item.quantity);
    }, 0);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item._id === productId);
  };

  const getCartItem = (productId: string) => {
    return items.find((item) => item._id === productId);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalCarbonSaved,
    isInCart,
    getCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
