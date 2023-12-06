import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Userapi from '../api/Userapi';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Authcontext } from '../context/Authcontext';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';

const Post = () => {
  const { user } = useContext(Authcontext);
  const { token } = useContext(Authcontext);
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
      { cancelable: false }
    );
  };

  const choosePhoto = () => {
    const options = {
      title: 'Seleccionar Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
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

  const uploadImage = async () => {
    try {
      if (!selectedImage) {
        throw new Error('Selecciona una imagen primero.');
      }
  
      const uri = Platform.OS === 'android' ? selectedImage : selectedImage.replace('file://', '');
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
        throw new Error('La respuesta del servidor no tiene la propiedad "url".');
      }
  
      return response.data;
    } catch (error) {
      console.log('Error al subir la imagen:', error.message);
      throw error;
    }
  };

  const form_submit = async () => {
    const imageData = await uploadImage();

    if (!imageData) {
      console.log('Error al obtener datos de la imagen.');
      return;
    }

    const uri = imageData.url;

    const post = {
      post_title: postTitle,
      post_description: postDescription,
      post_image_dir: uri,
      post_likes: 0,
      post_comments: 0,
      user_id: user.id,
    };

    try {
      const { data } = Userapi.post('/api/post', post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Foto</Text>
      <TouchableOpacity style={styles.button} onPress={choosePhoto}>
        <Text style={styles.buttonText}>Agregar Foto</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      {/* Entradas de texto para el título y la descripción */}
      <PaperTextInput
        label="Título de la Publicación"
        value={postTitle}
        onChangeText={text => setPostTitle(text)}
        style={styles.input}
      />
      <PaperTextInput
        label="Descripción de la Publicación"
        value={postDescription}
        onChangeText={text => setPostDescription(text)}
        style={styles.input}
      />

      {/* Botón debajo de la imagen */}
      <TouchableOpacity style={styles.alertButton} onPress={alerta}>
        <Text style={styles.buttonText}> Cancelar </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.alertButton} onPress={form_submit}>
        <Text style={styles.buttonText}> Post </Text>
      </TouchableOpacity>
      
      {/* Barra de navegación inferior */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    width: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  alertButton: {
    backgroundColor: 'red', // Puedes cambiar el color según tus preferencias
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
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
});

export default Post;





