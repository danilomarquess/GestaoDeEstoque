import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddItemScreen({ navigation, route }) {
  const { setItems, categories, handleAddCategory, editingItem } = route.params;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (editingItem) {
      const { name, quantity, category } = editingItem;
      setName(name);
      setQuantity(quantity.toString());
      setCategory(category);
    }
  }, [editingItem]);

  const handleSave = () => {
    if (!name || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (!category && !newCategory.trim()) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria existente ou crie uma nova!');
      return;
    }

    const selectedCategory = category || newCategory.trim();

    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name,
      quantity: parseInt(quantity, 10) || 0,
      category: selectedCategory,
    };

    setItems((prevItems) => {
      if (editingItem) {
        return prevItems.map(item =>
          item.id === editingItem.id ? newItem : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });

    if (newCategory.trim() && !category) {
      handleAddCategory(newCategory.trim());
    }

    navigation.goBack();
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Ou insira uma nova categoria"
        value={newCategory}
        onChangeText={setNewCategory}
      />

      <Button title={editingItem ? "Salvar Alterações" : "Salvar"} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fffaf2',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
});
