/* eslint-disable prettier/prettier */
import {View, text} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import Register from '../views/Register';
import {Home} from '../views/Home';
import Post from '../views/Post';
import Profile from '../views/Profile';

import {Authcontext} from '../context/Authcontext';
const Stack = createNativeStackNavigator();
export const Navigator = () => {
  const {status} = useContext(Authcontext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status === 'noauth' ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
};
