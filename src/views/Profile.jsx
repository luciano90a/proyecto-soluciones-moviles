/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  modalVisible,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Userapi from '../api/Userapi';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Authcontext} from '../context/Authcontext';
import {Button, TextInput as PaperTextInput} from 'react-native-paper';

const Profile = () => {
  const {user} = useContext(Authcontext);
  const {token} = useContext(Authcontext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const navigation = useNavigation();

  const uploadImage = async () => {
    try {
      if (!selectedImage) {
        throw new Error('Selecciona una imagen primero.');
      }

      const uri =
        Platform.OS === 'android'
          ? selectedImage
          : selectedImage.replace('file://', '');
      const form_data = new FormData();
      form_data.append('image', {
        uri,
        name: selectedImage.split('/').pop(),
        type: 'image/jpeg',
      });

      const response = await Userapi.post('/api/upload', form_data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data || !response.data.url) {
        throw new Error(
          'La respuesta del servidor no tiene la propiedad "url".',
        );
      }

      return response.data;
    } catch (error) {
      console.log('Error al subir la imagen:', error.message);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{flex: 1,justifyContent:'center',alignContent:'center'}}>
      <View>
        

        <View style={styles.profileContainer}>
          <Text style={styles.text} > name:{user.name} </Text>
          <Text style={styles.text} > username:{user.username} </Text>
          <Text style={styles.text} > lastname:{user.lastname} </Text>
          <Text style={styles.text} > email:{user.email} </Text>
        </View>

      </View>

      {/* NavBar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="add-to-home-screen" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <Icon name="add-to-photos" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Icon name="person" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text:{
    marginTop:'10%',
    backgroundColor:'orange',
    borderRadius:50,
    fontSize:23,
    fontFamily:'fantasy',
    borderWidth:5,
    borderColor:'red',
    textAlign:'center',
    width:'100%',
    color:'black'
  },
  flatList: {
    flexGrow: 1, //  FlatList se expanda según el contenido
  },
  scrollView: {
    backgroundColor: 'white',
    width: '80%',
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'darkcyan',
    alignContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    left: 0,
    width: '49%',
    backgroundColor: 'white',
  },
  profileContainer: { 
    width: '100%',
    backgroundColor: '#00FFFF',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    marginLeft:'1%',
    marginTop:'15%',
    borderRadius:50,
    padding:'10%',
    borderWidth:10,
    borderColor:'green',
    borderStyle:'dotted'

    
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    left: 0,
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
    transform: [{rotate: '180deg'}],
  },
  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: 'orange', // Puedes ajustar el color según tus preferencias
    padding: 10,
    borderRadius: 5,
  },
});

export default Profile;


