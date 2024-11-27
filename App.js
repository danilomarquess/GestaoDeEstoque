import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import LoginScreen from './screens/LoginScreen'; // Importando a tela de login

const Stack = createStackNavigator();

export default function App() {
  const [items, setItems] = useState([ // Estado compartilhado para os itens
    { id: '1', name: 'Açaí 1L', quantity: 10, category: 'Bebidas' },
    { id: '2', name: 'Granola 500g', quantity: 15, category: 'Cereais' },
    { id: '3', name: 'Cupuaçu 500ml', quantity: 8, category: 'Bebidas' },
    { id: '4', name: 'Leite Condensado', quantity: 4, category: 'Doces' },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ocultar o cabeçalho da tela de login
        />
        
        {/* Tela de Estoque */}
        <Stack.Screen 
          name="Estoque" 
          options={{ title: 'Estoque' }}
        >
          {props => <HomeScreen {...props} items={items} setItems={setItems} />}
        </Stack.Screen>
        
        {/* Tela para adicionar item */}
        <Stack.Screen 
          name="Adicionar Item" 
          options={{ title: 'Adicionar Item' }}
        >
          {props => <AddItemScreen {...props} setItems={setItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}