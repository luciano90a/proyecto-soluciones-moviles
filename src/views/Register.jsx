import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Authcontext } from '../context/Authcontext';
import { useForm } from '../hooks/Form';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  var skill_user = [];
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const { sign_up } = useContext(Authcontext);
  const { name, username, lastname, email, password, onChange } = useForm({
    name: '',
    username: '',
    lastname: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const register = () => {
    sign_up({ name, username, lastname, email, password });
  };

  const addSkill = () => {
    if (skill && skills.length < 3) {
      setSkills([...skills, skill]);
      skill_user.push(skill);
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
        placeholder="Apellido"
        onChangeText={(value) => onChange(value, 'lastname')}
        value={lastname}
        style={styles.input}
      />

      <TextInput
        placeholder="Username"
        onChangeText={(value) => onChange(value, 'username')}
        value={username}
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

      <TouchableOpacity style={styles.authButton} onPress={register}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.authButton} onPress={goToLogin}>
        <Text style={styles.buttonText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  title: {
    color: '#333',
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(204, 204, 204, 0.5)', // Cambiado a un tono de gris más claro
    padding: 12,
    marginBottom: 16,
    borderRadius: 5,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
    fontSize: 16,
  },
  skillInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  skillInput: {
    flex: 1,
    backgroundColor: 'rgba(204, 204, 204, 0.5)', // Cambiado a un tono de gris más claro
    padding: 12,
    marginRight: 8,
    borderRadius: 5,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  skillItem: {
    color: 'red',
  },
  authButton: {
    backgroundColor: '#27AE60',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Register;





