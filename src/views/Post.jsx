import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Foto</Text>
      <TouchableOpacity style={styles.button} onPress={choosePhoto}>
        <Text style={styles.buttonText}>Agregar Foto</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
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
});

export default App;
