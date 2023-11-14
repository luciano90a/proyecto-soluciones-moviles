// Login.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import users from '../api/Get_users'; // Ajusta la ruta según tu estructura de carpetas

const Login = () => {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const get_users = async () => {
    try {
      const response = await users.get('/api/users'); // Ajusta la ruta según tu configuración
      console.log('Usuarios:', response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Login Screen</Text>

      <TextInput placeholder="Correo Electrónico" keyboardType="email-address" />
      <TextInput placeholder="Contraseña" secureTextEntry />

      <Button title="Ver Usuarios" onPress={get_users} />

      <Text style={{ marginTop: 16 }}>¿No tienes una cuenta?</Text>
      <Button title="Registrarse" onPress={goToRegister} />
    </View>
  );
};

export default Login;




