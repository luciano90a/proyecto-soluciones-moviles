import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Authcontext } from '../context/Authcontext';
import { useForm } from '../hooks/Form';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const { sign_up } = useContext(Authcontext);
  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const register = () => {
    sign_up({ name, email, password });
  };

  const addSkill = () => {
    if (skill && skills.length < 3) {
      setSkills([...skills, skill]);
      setSkill('');
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        onChangeText={(value) => onChange(value, 'name')}
        value={name}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo Electrónico"
        onChangeText={(value) => onChange(value, 'email')}
        value={email}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        onChangeText={(value) => onChange(value, 'password')}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Habilidades:</Text>

      <View style={styles.skillInputContainer}>
        <TextInput
          placeholder="Habilidad"
          value={skill}
          onChangeText={(text) => setSkill(text)}
          style={styles.skillInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addSkill}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={skills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.skillItem}>{item}</Text>}
      />

      <TouchableOpacity style={styles.registerButton} onPress={register}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginButtonText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
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
  title: {
    color: '#00FFFF',
    fontSize: 24,
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
  label: {
    marginTop: 8,
    marginBottom: 4,
    color: '#00FFFF',
    fontSize: 16,
  },
  skillInputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  skillInput: {
    backgroundColor: 'rgba(204, 204, 204, 0.8)',
    flex: 1,
    padding: 10,
    marginRight: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  skillItem: {
    color: 'red',
  },
  registerButton: {
    backgroundColor: '#0000FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#00FFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Register;


