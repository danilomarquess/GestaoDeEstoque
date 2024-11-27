import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Valor inicial para o fade-in

  const handleLogin = () => {
    if (username === 'Admin' && password === '1234') {
      navigation.replace('Estoque'); // Redireciona para a tela "Estoque"
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1, // Finaliza com o valor 1 (totalmente opaco)
      duration: 1000, // Duração de 1 segundo
      useNativeDriver: true, // Utiliza o driver nativo para animações mais fluidas
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Login Estoque Açaí</Text>
        <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={styles.inputPlaceholder.color}
        />
        <View style={styles.passwordContainer}>
        <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={styles.inputPlaceholder.color}
        />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <Text style={styles.eyeIconText}>{passwordVisible ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#6A1B9A', // Cor roxa (cor de açaí)
  },
  formContainer: {
    width: '100%', // Garante que o formulário ocupe a largura inteira
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Cor branca para o título
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff', // Borda branca para os campos
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%', // Define a largura dos campos
    color: '#fff', // Texto branco nos campos de entrada
  },
  inputPlaceholder: {
    color: '#D1C4E9', // Cor suave de branco/púrpura para o placeholder
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Garante que o campo de senha tenha a mesma largura
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 5, // Subindo o ícone um pouquinho para centralizar
  },
  eyeIconText: {
    fontSize: 24,
    color: '#fff', // Cor branca para o ícone
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
