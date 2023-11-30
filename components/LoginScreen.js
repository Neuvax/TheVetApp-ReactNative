import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        const user = userCredential.user;
        // Navigate to MenuActivity screen
        navigation.navigate('MenuActivity');
      })
      .catch(error => {
        Alert.alert("Login failed", error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Successful signup, navigate to MenuActivity
        navigation.navigate('MenuActivity');
      })
      .catch(error => {
        Alert.alert("Signup failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
    <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
    />
    <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
    />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5', // Un fondo claro
  },
  input: {
      height: 50,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#007bff', // Borde azul
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: 16, // Tamaño de fuente mayor para mejor legibilidad
      backgroundColor: 'white', // Fondo blanco para los campos de texto
  },
  button: {
      backgroundColor: '#007bff', // Botón con fondo azul
      padding: 15,
      borderRadius: 5,
      marginTop: 10,
  },
  buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold', // Texto en negrita para el botón
  },
});

export default LoginScreen;
