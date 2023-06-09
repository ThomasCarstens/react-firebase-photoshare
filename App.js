import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectionScreen from './screens/SelectionScreen';


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        
        
        
        <Stack.Screen options={{headerShown: false}} name="Selection" component={SelectionScreen} />
        
        
        
        
        
        

        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;