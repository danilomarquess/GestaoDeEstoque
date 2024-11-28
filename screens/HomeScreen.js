import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen({ navigation, items, setItems }) {
  const [categories, setCategories] = useState(['Bebidas', 'Cereais', 'Doces', 'Outros']);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingQuantity, setEditingQuantity] = useState('');
  const [editingCategory, setEditingCategory] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [incrementInterval, setIncrementInterval] = useState(null);
  const [decrementInterval, setDecrementInterval] = useState(null);
  
  const initialItems = [
    { id: 1, name: 'Açaí Bowl', quantity: 10, category: 'Bebidas' },
    { id: 2, name: 'Granola', quantity: 20, category: 'Cereais' },
    { id: 3, name: 'Banana Sliced', quantity: 15, category: 'Doces' },
    { id: 4, name: 'Morango', quantity: 8, category: 'Doces' },
    { id: 5, name: 'Mel', quantity: 12, category: 'Doces' },
    { id: 6, name: 'Leite Condensado', quantity: 8, category: 'Doces' },
    { id: 7, name: 'Guaraná', quantity: 10, category: 'Bebidas' },
    { id: 8, name: 'Coco Ralado', quantity: 18, category: 'Doces' },
    { id: 9, name: 'Chia', quantity: 25, category: 'Cereais' },
    { id: 10, name: 'Castanha do Pará', quantity: 30, category: 'Frutos Secos' },
    { id: 11, name: 'Amendoim', quantity: 10, category: 'Frutos Secos' },
    { id: 12, name: 'Morango Congelado', quantity: 7, category: 'Frutas' },
    { id: 13, name: 'Coco Fresco', quantity: 12, category: 'Frutas' },
    { id: 14, name: 'Leite de Coco', quantity: 8, category: 'Bebidas' },
    { id: 15, name: 'Manga Sliced', quantity: 18, category: 'Frutas' },
    { id: 16, name: 'Abacaxi', quantity: 20, category: 'Frutas' },
    { id: 17, name: 'Granola Sem Açúcar', quantity: 15, category: 'Cereais' },
    { id: 18, name: 'Pistache', quantity: 6, category: 'Frutos Secos' },
    { id: 19, name: 'Kiwi', quantity: 10, category: 'Frutas' },
    { id: 20, name: 'Açaí Concentrado', quantity: 25, category: 'Bebidas' },
    { id: 21, name: 'Melancia', quantity: 14, category: 'Frutas' },
    { id: 22, name: 'Laranja', quantity: 12, category: 'Frutas' },
    { id: 23, name: 'Cacau em Pó', quantity: 9, category: 'Doces' },
    { id: 24, name: 'Cenoura Ralada', quantity: 8, category: 'Vegetais' },
    { id: 25, name: 'Manteiga de Amendoim', quantity: 10, category: 'Bebidas' },
  ];


  let isInitialized = false;
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  useEffect(() => {
    setItems(initialItems);
    setTimeout(() => setAlertsEnabled(true), 500);
  }, []);

  useEffect(() => {
    const categoriesInItems = [...new Set(items.map(item => item.category))];
    setCategories((prevCategories) => [
      ...prevCategories,
      ...categoriesInItems.filter(cat => !prevCategories.includes(cat)),
    ]);
  }, [items]);

  useEffect(() => {
    if (!alertsEnabled) return;
  
    const lowStockItems = items.filter(item => item.quantity < 5 && item.quantity > 0);
    if (lowStockItems.length > 0) {
      const lowStockNames = lowStockItems.map(item => item.name).join(', ');
      alert(`Estoque crítico para: ${lowStockNames}`);
    }
  
  
    const outOfStockItems = items.filter(item => item.quantity === 0);
    if (outOfStockItems.length > 0) {
      const outOfStockNames = outOfStockItems.map(item => item.name).join(', ');
      alert(`Produto acabou: ${outOfStockNames}`);
    }
  }, [items, alertsEnabled]);

  useEffect(() => {
    if (!alertsEnabled) return; 
  
    items.forEach(item => {
      if (item.quantity === 0 && !item.alertedOutOfStock) {
        alert(`Produto acabou: ${item.name}`);
        item.alertedOutOfStock = true;
      } else if (item.quantity > 0 && item.alertedOutOfStock) {
        item.alertedOutOfStock = false;
      }
    });
  }, [items, alertsEnabled]);
  

  const handleAddCategory = (newCategory) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingName(item.name);
    setEditingQuantity(item.quantity.toString());
    setEditingCategory(item.category);
  };

  const handleSaveEdit = () => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === editingItemId
          ? {
              ...item,
              name: editingName,
              quantity: parseInt(editingQuantity, 10) || 0,
              category: editingCategory,
            }
          : item
      );
  
      updatedItems.forEach((item) => {
        if (item.quantity < 5 && alertsEnabled) {
          alert(`Estoque baixo: ${item.name}`);
        }
      });
  
      return updatedItems;
    });
  
    setEditingItemId(null);
    setEditingName('');
    setEditingQuantity('');
    setEditingCategory('');
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditingName('');
    setEditingQuantity('');
    setEditingCategory('');
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      const remainingCategories = [...new Set(updatedItems.map(item => item.category))];
      
      setCategories((prevCategories) => prevCategories.filter(category => remainingCategories.includes(category)));
  
      return updatedItems;
    });
    setEditingItemId(null);
  };
  

  const incrementQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
};
  
const decrementQuantity = (id) => {
  setItems((prevItems) =>
    prevItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity - 1, 0);

        if (newQuantity === 0) {
          alert(`Produto acabou: ${item.name}`);
        } else if (newQuantity < 5 && newQuantity > 0) {
          alert(`Estoque baixo para: ${item.name}`);
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  );
};
  

  const startIncrement = (id) => {
    const interval = setInterval(() => incrementQuantity(id), 200);
    setIncrementInterval(interval);
  };

  const startDecrement = (id) => {
    const interval = setInterval(() => decrementQuantity(id), 200);
    setDecrementInterval(interval);
  };

  const stopInterval = () => {
    clearInterval(incrementInterval);
    clearInterval(decrementInterval);
    setIncrementInterval(null);
    setDecrementInterval(null);
  };

  const filteredItems = items.filter((item) => {
  const matchesText = item.name.toLowerCase().includes(filterText.toLowerCase());
  const matchesCategory = filterCategory
    ? item.category.toLowerCase() === filterCategory.toLowerCase()
    : true;
  return matchesText && matchesCategory;
});

const renderItem = ({ item }) => {
  const isEditing = editingItemId === item.id;

  return (
    <View style={styles.itemContainer}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editingName}
            onChangeText={setEditingName}
            placeholder="Nome do Produto"
          />
          <TextInput
            style={styles.quantityInput}
            value={editingQuantity}
            onChangeText={setEditingQuantity}
            placeholder="Quantidade"
            keyboardType="numeric"
          />
          <Picker
            selectedValue={editingCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setEditingCategory(itemValue)}
          >
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.editButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
              <Text style={styles.editButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Text style={styles.editButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.itemText}>
            {item.name} - {item.quantity} unidades ({item.category})
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => decrementQuantity(item.id)}
              onPressIn={() => startDecrement(item.id)}
              onPressOut={stopInterval}
            >
              <Text style={styles.adjustButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.slashText}>/</Text>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => incrementQuantity(item.id)}
              onPressIn={() => startIncrement(item.id)}
              onPressOut={stopInterval}
            >
              <Text style={styles.adjustButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={filterText}
        onChangeText={setFilterText}
        placeholder="Buscar produto no estoque"
      />

      <Picker
        selectedValue={filterCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setFilterCategory(itemValue)}
      >
        <Picker.Item label="Todas as Categorias" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <View style={styles.addItemContainer}>
        <Button
          title="Adicionar Item"
          onPress={() =>
            navigation.navigate('Adicionar Item', {
              setItems,
              categories,
              handleAddCategory,
            })
          }
          color="#800080"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 70,
    justifyContent: 'flex-start',
    backgroundColor: '#fffaf2',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexWrap: 'wrap',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    backgroundColor: 'black',
    borderRadius: 0,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  adjustButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#88c853',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,

  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,

  },
  deleteButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  addItemContainer: {
    marginTop: 20,
  },
  logoutButton: {
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    right: 20, 
    alignItems: 'center', 
    backgroundColor: '#dc3545', 
    padding: 8, 
    borderRadius: 5
  },
  logoutButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  },
  adjustSymbolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 5,
  },
  slashText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  quantityInput: {
    width: 80,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});
