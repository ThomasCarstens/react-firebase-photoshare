import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
  
const TableExample = (props) => {
  const navigation = useNavigation();

  const lastscore = props.route.params?.lastscore  
  const data = props.route.params?.data  

  const spoofAccuracy = data['Animal tracks']['accuracy'][0]
  console.log(spoofAccuracy)

  
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