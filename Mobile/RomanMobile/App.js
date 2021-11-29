import React from 'react';
import {StatusBar, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/login';
import Listagem from './src/screens/main';

const AuthStack = createStackNavigator();

function App() {


  return (
    <View>
      <NavigationContainer>
        <StatusBar

        />
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
          <AuthStack.Screen name="Listagem" component={Listagem}></AuthStack.Screen>
        </AuthStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
export default App;
