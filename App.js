import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider, useCart } from './context/CartContext';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack для главной вкладки
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductScreen} 
        options={{ title: 'Описание растения' }}
      />
    </Stack.Navigator>
  );
}

// Stack для корзины
function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CartMain" 
        component={CartScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ title: 'Оформление заказа' }}
      />
      <Stack.Screen 
        name="OrderSuccess" 
        component={OrderSuccessScreen}
        options={{ 
          title: 'Заказ оформлен',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

// Компонент для Tab Navigator
function TabNavigator() {
  const { totalItems } = useCart(); // Получаем totalItems из контекста
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Plants') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Plants" 
        component={HomeStack} 
        options={{ 
          title: 'Растения',
          headerShown: false 
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartStack} 
        options={{ 
          title: 'Корзина',
          headerShown: false,
          tabBarBadge: totalItems > 0 ? totalItems : undefined, // Используем totalItems
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}