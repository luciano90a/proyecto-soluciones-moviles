/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Authcontext } from '../context/Authcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Profile = () => {
    const { log_out } = useContext(Authcontext);
    const navigation = useNavigation();
    //const

    return (
      <View style={styles.container}>
        {/* Botón de Logout en la esquina superior izquierda */}
        <TouchableOpacity style={styles.logoutButton} onPress={log_out}>
          <Icon name="logout" size={25} color="white" style={styles.rotateLeft} />
        </TouchableOpacity>

        {/* Contenido de la pantalla Profile */}
        {/** Información de perfil */}
        <View style={styles.container50}>
          <Text>¡Hola!</Text>
        </View>
        {/** Posts realizados */}
        <View style={styles.container50}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
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
    container50: {
      width: '50%',
      padding: '10px',
    },
  });

  export default Profile;

/**
 * {
    "name": "nombre20",
    "username":"ejemaaasssa",
    "lastname":"ejemaaasssa",
    "email": "email8@gmail.com",
    "password": "elpass",
    "role":"admin"
}
 */
