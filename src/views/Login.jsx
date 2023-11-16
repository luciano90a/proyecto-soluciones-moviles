import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import users from '../api/Get_users';
import { Authcontext } from '../context/Authcontext';
import { useForm } from '../hooks/Form';

const Login = () => {
  const navigation = useNavigation();
  const { sign_in } = useContext(Authcontext);

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const get_users = async () => {
    try {
      const response = await users.get('/api/users');
      console.log('Usuarios:', response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const on_login = () => {
    sign_in({ email, password });
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Socialdev</Text>

      <TextInput
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(value) => onChange(value, 'email')}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        onChangeText={(value) => onChange(value, 'password')}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={on_login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    color: '#00FFFF',
    fontSize: 36,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  input: {
    backgroundColor: 'rgba(204, 204, 204, 0.8)',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#00FFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Login;


