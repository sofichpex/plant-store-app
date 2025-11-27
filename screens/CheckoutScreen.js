import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../hooks/useCustomAlert';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { alertVisible, alertConfig, showAlert, hideAlert } = useCustomAlert();

  const handleSubmitOrder = () => {
    // Проверяем заполнение всех полей
    if (!name.trim()) {
      showAlert({
        title: 'Заполните поле',
        message: 'Пожалуйста, введите ваше имя',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    if (!address.trim()) {
      showAlert({
        title: 'Заполните поле',
        message: 'Пожалуйста, введите адрес доставки',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    if (!phone.trim()) {
      showAlert({
        title: 'Заполните поле',
        message: 'Пожалуйста, введите ваш телефон',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    if (!email.trim()) {
      showAlert({
        title: 'Заполните поле',
        message: 'Пожалуйста, введите ваш email',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({
        title: 'Неверный формат',
        message: 'Пожалуйста, введите корректный email адрес',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    // Проверяем формат телефона (простая проверка)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      showAlert({
        title: 'Неверный формат',
        message: 'Пожалуйста, введите корректный номер телефона',
        type: 'error',
        primaryButtonText: 'Хорошо',
      });
      return;
    }

    // Если все проверки пройдены - переходим на экран успеха
    navigation.navigate('OrderSuccess', { 
      total,
      customerName: name 
    });
    clearCart();
  };

  // Функция для подсветки незаполненных полей
  const getInputStyle = (value) => {
    return value.trim() ? styles.input : [styles.input, styles.errorInput];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Оформление заказа</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Ваши данные</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={getInputStyle(name)}
            placeholder="Ваше имя"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={getInputStyle(address)}
            placeholder="Адрес доставки"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={getInputStyle(phone)}
            placeholder="Телефон"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={getInputStyle(email)}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.orderSection}>
        <Text style={styles.sectionTitle}>Ваш заказ</Text>
        {cartItems.map((item) => (
          <View key={item.cartId} style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemQuantity}>× {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()} ₽</Text>
          </View>
        ))}
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Итого:</Text>
          <Text style={styles.totalAmount}>{total.toLocaleString()} ₽</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleSubmitOrder}
      >
        <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.confirmButtonText}>Подтвердить заказ</Text>
      </TouchableOpacity>

      {/* Кастомный алерт для ошибок */}
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        primaryButtonText={alertConfig.primaryButtonText}
        onPrimaryPress={hideAlert}
        onClose={hideAlert}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2E7D32',
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  orderSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#333',
  },
  errorInput: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  orderItemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e9ecef',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 30,
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});