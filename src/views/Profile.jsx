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

  const alerta = () => {
    Alert.alert(
      'Alerta',
      'Este es el mensaje de alerta',
      [
        {
          text: 'Cancelar',
          onPress: () => Alert.alert('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
        },
      ],
      {cancelable: false},
    );
    
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorCode);
      } else if (response.didCancel) {
        console.log('Cancelado por el usuario');
      } else if (response.assets && response.assets.length > 0) {
        const path = response.assets[0].uri;
        setSelectedImage(path);
        console.log(path);
      }
    });
  };

  return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Text>Image</Text>
          </View>

          <View style={styles.profileContainer}>
            <Text> ${user.name} </Text>
            <Text> ${user.username} </Text>
            <Text> ${user.lastname} </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Seleccionar Foto</Text>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Press me
            </Button>
          </View>
        </ScrollView>

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
  flatList: {
    flexGrow: 1, //  FlatList se expanda según el contenido
  },
  scrollView: {
    width: '80%',
    height: 'auto',
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
    flex: 1,
    right: 0,
    width: '49%',
    backgroundColor: 'white',
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
