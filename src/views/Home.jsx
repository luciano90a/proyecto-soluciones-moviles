/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Authcontext } from '../context/Authcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Home = () => {
  const { log_out } = useContext(Authcontext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón de Logout en la esquina superior izquierda */}
      <TouchableOpacity style={styles.logoutButton} onPress={log_out}>
        <Icon name="logout" size={25} color="white" style={styles.rotateLeft} />
      </TouchableOpacity>

      {/* Contenido de la pantalla Home */}
      <View style={styles.content}>
        <Text>¡Hola!</Text>
      </View>

      {/* Barra de navegación en la parte inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="add-to-home-screen" size={25} color="black"  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <Icon name="add-to-photos" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00FFFF',
    paddingVertical: 10,
  },
  rotateLeft: {
    transform: [{ rotate: '180deg' }],
  },
});

export default Home;




//Te estoy hablando por el chat de texto de discord

