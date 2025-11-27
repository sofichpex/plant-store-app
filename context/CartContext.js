// context/CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Загрузка корзины при запуске
  useEffect(() => {
    loadCart();
  }, []);

  // Сохранение корзины при изменении
  useEffect(() => {
    saveCart();
  }, [cartItems]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('plant_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log('Ошибка загрузки корзины:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('plant_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.log('Ошибка сохранения корзины:', error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Если товара нет, добавляем новый
        return [...prev, { ...product, quantity, cartId: Date.now() }];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Общая сумма с учетом количества
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Общее количество товаров
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      total,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}