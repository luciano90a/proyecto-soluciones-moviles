import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Userapi from '../api/Userapi';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Authcontext } from '../context/Authcontext';

const Post = () => {
  const { user } = useContext(Authcontext);
  const [image, setSelectedImage] = useState(null);
  const [response, set_response] = useState('');
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
      } else {
        const path = response.assets[0].uri;
        setSelectedImage(path);
        console.log(path);
      }
    });
  };

  const uploadImage = async () => {
    const uri = Platform.OS === 'android' ? path : image.replace('file://', '');
    const form_data = new FormData();
    form_data.append('image', {
      uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    });

    try {
      const url_api = await Userapi.post('/api/upload', form_data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.data.isSuccess) {
        console.log('image fail');
        return;
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const form_submit = async () => {
    let uri;
    const contain_image = image.includes('file');
    if (contain_image) {
      const response = await uploadImage();
      uri = response.data.uri;
    } else {
      uri = image;
    }
    const post = {
      post_title: 'mi post',
      post_description: 'mi des',
      post_image_dir: uri,
      user_id: user.id,
    };
  };
  try {
    const {data}=Userapi.post('/api/post',post,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
      
    });
    console.log(data);
  }catch{

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Foto</Text>
      <TouchableOpacity style={styles.button} onPress={choosePhoto}>
        <Text style={styles.buttonText}>Agregar Foto</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Botón debajo de la imagen */}
      <TouchableOpacity style={styles.alertButton} onPress={alerta}>
        <Text style={styles.buttonText}> Cancelar </Text>
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

