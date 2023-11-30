import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen'; 
import MenuScreen from './components/MenuScreen'; 
import DetailScreen from './components/DetailScreen'; 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="MenuActivity" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Animal Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
