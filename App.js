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
import ThreadedHomeScreen from './threaded-screens/ThreadedHomeScreen';
import ThreadedTestScreen from './threaded-screens/ThreadedTestScreen';
import { ref as ref_d, set, get, onValue } from 'firebase/database'
import { storage, database } from './firebase'

const Stack = createNativeStackNavigator();
const UserContext = React.createContext()

function App() {
  const [gameFileContext, setGameFile] =   React.useState()
  const hi = 'hi'
  React.useMemo(()=>{
      
    // GameFile loaded from Firebase Realtime Database.
    const gameFileRef = ref_d(database, "gameFile" );

    onValue(gameFileRef, (snapshot) =>  {
          const data = snapshot.val();
          if (data){
            console.log('Gamefile downloaded in App.js')
            setGameFile(data)

          }
          
        })
      }, [])
            return (
  

            <UserContext.Provider value={hi}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen options={{headerShown: false}} initialParams={{"gameFileContext": gameFileContext}} name="Login" component={LoginScreen} />
                  <Stack.Screen options={{headerShown: false}} initialParams={{"gameFileContext": gameFileContext}} name="Selection" component={SelectionScreen} />
                  <Stack.Screen options={{headerShown: false}} initialParams={{"gameFileContext": gameFileContext}} name="Home" component={HomeScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Sequence" component={SequenceScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Score" component={ScoreScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Test" component={TestScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Application" component={ApplicationScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Comparison" component={ComparisonScreen} />    
                  {/* <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Selection" component={SelectionScreen} /> */}
                  <Stack.Screen options={{headerShown: false}} name="ThreadedHome" component={ThreadedHomeScreen} />
                  {/* <Stack.Screen options={{headerShown: false}} name="Sequence" component={SequenceScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Score" component={ScoreScreen} /> */}
                  <Stack.Screen options={{headerShown: false}} name="ThreadedTest" component={ThreadedTestScreen} />
                  {/* <Stack.Screen options={{headerShown: false}} name="Application" component={ApplicationScreen} />
                  <Stack.Screen options={{headerShown: false}} name="Comparison" component={ComparisonScreen} />   */}
                </Stack.Navigator>
              </NavigationContainer>
            </UserContext.Provider>

            );

}

export default App;