import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';

const TableExample = (props) => {
  const navigation = useNavigation();
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'
  const lastscore = props.route.params?.lastscore  
  const data = props.route.params?.data  

  const spoofAccuracy = data?data['Animal tracks']['accuracy'][0]:"Sign In"
  console.log(spoofAccuracy)
  if (!webView){
    ScreenOrientation.lockAsync(2); //PROFILE
  } 
  
  return (
    <View>
        <View padding={60}></View>
        <Text style={{fontSize:50, marginLeft:30}}>Your scores</Text>
        <View padding={30}></View>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Game</DataTable.Title>
          <DataTable.Title>Score</DataTable.Title>
        </DataTable.Header>
        
        <DataTable.Row>
          <DataTable.Cell>13 June 2023</DataTable.Cell>
          <DataTable.Cell>Dogs</DataTable.Cell>
          <DataTable.Cell>{spoofAccuracy}%</DataTable.Cell>
        </DataTable.Row>
    
        <DataTable.Row>
          <DataTable.Cell>13 June 2023</DataTable.Cell>
          <DataTable.Cell>Dogs</DataTable.Cell>
          <DataTable.Cell>58.44%</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>13 June 2023</DataTable.Cell>
          <DataTable.Cell>Dogs</DataTable.Cell>
          <DataTable.Cell>58.44%</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>13 June 2023</DataTable.Cell>
          <DataTable.Cell>Dogs</DataTable.Cell>
          <DataTable.Cell>{lastscore}%</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <View flexDirection='row'>

      {/* <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  navigation.replace("Selection")
                }}>
                  <Text style={{fontWeight:"bold"}}> {"\n START OVER"} </Text>
      </TouchableOpacity>   */}
      <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  navigation.replace("Selection")
                }}>
                  <Text style={{fontWeight:"bold"}}> {"\n CHANGE GAME"} </Text>
      </TouchableOpacity>  
      
      </View>
    </View>
    
  );
};
  
export default TableExample;
  
const styles = StyleSheet.create({
  container: {
    padding: 22,

  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },

  gameSelection: {

    justifyContent: "flex-start",
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop:50,
    marginLeft:80,
    // backgroundColor:'rgba(144, 144, 0, 0.8)',
    backgroundColor:'rgba(102, 140, 190, 1)',
    borderRadius: 50
  },

});