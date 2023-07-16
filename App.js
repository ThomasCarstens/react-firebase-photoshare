import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectionScreen from './screens/SelectionScreen';
import ScoreScreen from './screens/ScoreScreen';
import SequenceScreen from './screens/SequenceScreen';
import TestScreen from './screens/TestScreen';
import ApplicationScreen from './screens/ApplicationScreen';
import ComparisonScreen from './screens/ComparisonScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        
        
        
        
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Selection" component={SelectionScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Sequence" component={SequenceScreen} />
        <Stack.Screen options={{headerShown: false}} name="Score" component={ScoreScreen} />
        <Stack.Screen options={{headerShown: false}} name="Test" component={TestScreen} />
        <Stack.Screen options={{headerShown: false}} name="Application" component={ApplicationScreen} />
        <Stack.Screen options={{headerShown: false}} name="Comparison" component={ComparisonScreen} />  
        
        
        
        
        
        
        

        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;