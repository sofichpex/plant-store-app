import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../hooks/useCustomAlert';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity, total, totalItems, clearCart } = useCart();
  const { alertVisible, alertConfig, showAlert, hideAlert } = useCustomAlert();
  const [itemToRemove, setItemToRemove] = useState(null);

    const handleRemove = (item) => {
    setItemToRemove(item);
    showAlert({
        title: 'Удалить товар?',
        message: `Вы уверены, что хотите удалить "${item.title}" из корзины?`,
        type: 'warning',
        primaryButtonText: 'Удалить',
        secondaryButtonText: 'Отмена',
        onPrimaryPress: () => {
        removeFromCart(item.cartId);
        setItemToRemove(null);
        hideAlert(); // Закрываем текущий алерт
        showAlert({
            title: 'Удалено',
            message: `${item.title} удален из корзины`,
            type: 'success',
            primaryButtonText: 'OK',
        });
        },
        onSecondaryPress: () => {
        setItemToRemove(null);
        hideAlert(); // Добавляем закрытие алерта при отмене
        },
    });
    };

  const handleIncrease = (item) => {
    updateQuantity(item.cartId, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.cartId, item.quantity - 1);
    } else {
      handleRemove(item);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showAlert({
        title: 'Корзина пуста',
        message: 'Добавьте растения в корзину',
        type: 'info',
        primaryButtonText: 'OK',
      });
      return;
    }
    
    navigation.navigate('Checkout');
  };

  const handleClearCart = () => {
    showAlert({
      title: 'Очистить корзину?',
      message: 'Вы уверены, что хотите удалить все растения из корзины?',
      type: 'warning',
      primaryButtonText: 'Очистить',
      secondaryButtonText: 'Отмена',
      onPrimaryPress: () => {
        clearCart();
        showAlert({
          title: 'Корзина очищена',
          message: 'Все товары удалены из корзины',
          type: 'success',
          primaryButtonText: 'OK',
        });
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Ваша корзина пуста</Text>
        <Text style={styles.emptySubtext}>Добавьте растения из каталога</Text>
        <TouchableOpacity 
          style={styles.catalogButton}
          onPress={() => navigation.navigate('Plants')}
        >
          <Text style={styles.catalogButtonText}>Перейти к каталогу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Моя корзина</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartId.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price} ₽/шт</Text>
              <Text style={styles.itemTotal}>{(item.price * item.quantity).toLocaleString()} ₽</Text>
              
              {/* Счетчик количества */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleDecrease(item)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleIncrease(item)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemove(item)}
            >
              <Ionicons name="trash-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Товары ({totalItems} шт.):</Text>
            <Text style={styles.summaryValue}>
              {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} ₽
            </Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Итого:</Text>
            <Text style={styles.totalAmount}>{total.toLocaleString()} ₽</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Text style={styles.clearText}>Очистить корзину</Text>
        </TouchableOpacity>
      </View>

      {/* Кастомный алерт */}
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        primaryButtonText={alertConfig.primaryButtonText}
        secondaryButtonText={alertConfig.secondaryButtonText}
        onPrimaryPress={alertConfig.onPrimaryPress}
        onSecondaryPress={alertConfig.onSecondaryPress}
        onClose={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  catalogButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  catalogButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 12,
    alignItems: 'center',
  },
  clearText: {
    color: '#ff4444',
    fontSize: 16,
  },
});