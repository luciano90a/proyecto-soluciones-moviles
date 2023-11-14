/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login  from './src/views/Login';
import Register from './src/views/Register';

const Stack = createNativeStackNavigator();
const App =()=>{
  
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
    
export default App;
