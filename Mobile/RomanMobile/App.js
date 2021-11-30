import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/login';
import Listagem from './src/screens/listagem';

const AuthStack = createStackNavigator();

function App() {


  return (
      <NavigationContainer>
        <StatusBar

        />
        <AuthStack.Navigator>
           <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen> 
          <AuthStack.Screen name="Listagem" component={Listagem}></AuthStack.Screen>
        </AuthStack.Navigator>
      </NavigationContainer>
  );
}
export default App;
