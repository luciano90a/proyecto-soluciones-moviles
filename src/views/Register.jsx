// Register.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);

  const addSkill = () => {
    if (skill && skills.length < 5) {
      setSkills([...skills, skill]);
      setSkill('');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Registro</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Text>Habilidades:</Text>

      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <TextInput
          placeholder="Habilidad"
          value={skill}
          onChangeText={(text) => setSkill(text)}
        />
        <Button title="Agregar" onPress={addSkill} />
      </View>

      <FlatList
        data={skills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

      <Button title="Registrar" onPress={() => console.log('Enviando datos')} />
    </View>
  );
};

export default Register;
