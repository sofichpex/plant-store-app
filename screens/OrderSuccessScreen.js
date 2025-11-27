import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccessScreen({ navigation, route }) {
  const { total, customerName } = route.params || { total: 0, customerName: '' };

  const handleReturnToCatalog = () => {
    navigation.navigate('Plants');
  };

  const handleViewOrders = () => {
    // В будущем можно добавить экран истории заказов
    Alert.alert('История заказов', 'Эта функция скоро будет доступна!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.successCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Заказ оформлен!</Text>
        
        <Text style={styles.message}>
          {customerName ? `Спасибо, ${customerName}! ` : 'Спасибо за покупку! '}
          Ваш заказ успешно оформлен.
        </Text>

        <View style={styles.orderSummary}>
          <Text style={styles.summaryLabel}>Сумма заказа:</Text>
          <Text style={styles.summaryValue}>{total.toLocaleString()} ₽</Text>
        </View>

        <Text style={styles.details}>
          Мы отправили подтверждение на вашу почту.{'\n'}
          С вами свяжутся в течение дня для уточнения деталей доставки.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleReturnToCatalog}
          >
            <Ionicons name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Вернуться в каталог</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleViewOrders}
          >
            <Ionicons name="list" size={20} color="#4CAF50" style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Мои заказы</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  details: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});