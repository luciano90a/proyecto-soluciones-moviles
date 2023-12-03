import React, { useContext , useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Authcontext } from '../context/Authcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Userapi from '../api/Userapi';
import { ScrollView } from 'react-native';


export const Home = () => {
  const { token, log_out  } = useContext(Authcontext);
  const navigation = useNavigation();
  useEffect(()=>{
     get_post()
  },[]);
  console.log('tu token es: '+token);
  const get_post=async()=>{
    try{
      const response_post = await Userapi.get('/api/viewpost',
      {
        headers:{
          Authorization:'Bearer'+token
        }
      });
      console.log('los post son: '+JSON.stringify(response_post.data.posts ));
    }catch(error){

    }
  }
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
    alignContent:'center',
    alignItems:'center'
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






