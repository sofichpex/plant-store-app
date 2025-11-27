import { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TextInput
} from 'react-native';
import { plants } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация растений по поисковому запросу
  const filteredPlants = useMemo(() => {
    if (!searchQuery.trim()) {
      return plants;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return plants.filter(plant => 
      plant.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Растения для дома</Text>
      
      {/* Простое поле поиска */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск растений..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Список растений */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) => navigation.navigate('ProductDetails', { product })}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2E7D32',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});