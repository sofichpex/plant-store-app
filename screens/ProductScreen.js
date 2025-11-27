import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../hooks/useCustomAlert';

export default function ProductScreen({ route }) {
  const { product } = route?.params || {};
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { alertVisible, alertConfig, showAlert, hideAlert } = useCustomAlert();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showAlert({
      title: 'Добавлено в корзину!',
      message: `${product.title} (${quantity} шт.) добавлен в корзину! 🌿`,
      type: 'success',
      primaryButtonText: 'Отлично!',
    });
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Растение не найдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price} ₽</Text>
        
        {/* Выбор количества */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Количество:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Описание</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Уход</Text>
          <Text style={styles.care}>{product.care}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            Добавить в корзину • {(product.price * quantity).toLocaleString()} ₽
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кастомный алерт */}
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
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  care: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    fontStyle: 'italic',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});