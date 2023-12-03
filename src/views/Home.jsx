import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Authcontext } from '../context/Authcontext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Userapi from '../api/Userapi';
import { ScrollView } from 'react-native';
import Post from '../Components/Post'


export const Home = () => {
  const { token, log_out,posts,getPosts } = useContext(Authcontext);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  console.log('tu token es: '+token);
  const onRefresh = async () => {
    setRefreshing(true);
    // Realizar la solicitud para obtener nuevos datos
    await getPosts();
    setRefreshing(false);
};
  return (
     
    <View style={styles.container}>
     
       {/* Botón de Logout en la esquina superior izquierda */}
       <TouchableOpacity style={styles.logoutButton} onPress={log_out}>
        <Icon name="logout" size={25} color="white" style={styles.rotateLeft} />
      </TouchableOpacity>
      {/* Contenido de la pantalla Home */}
      <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled
                data={posts}
                renderItem={({ item }) => <Post post={item} />}
                keyExtractor={item => item.post_id.toString()}
                style={styles.flatList}
                contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
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
  flatList: {
    flexGrow: 1, // Para asegurar que la FlatList se expanda según el contenido
},
item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
},
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







