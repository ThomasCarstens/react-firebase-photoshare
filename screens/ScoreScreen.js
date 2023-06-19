import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { spoofGameSets } from '../gameFile';
import { auth } from '../firebase';

const TableExample = (props) => {
  const navigation = useNavigation();
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'
  const loggedIn = auth.currentUser
  const gameName = props.route.params?.name 
  const lastscore = props.route.params?.lastscore  
  let lastdate = props.route.params?.lastdate  
  const data = props.route.params?.data  
  let latestRecords = [];
  let latestRecordDates = [];
  let overallSuccess = 0
  if (data){
    const spoofAccuracy = data[gameName]['accuracy']

    if (spoofAccuracy){
      for (let level=0; level<Object.keys(spoofAccuracy).length; level++){
        let timeArray = Object.keys(spoofAccuracy[level]).map(each=> parseInt(each))
        timeArray.sort();
        latestRecords.push(100*spoofAccuracy[level][timeArray[0]])
        let latestDate = new Date(timeArray[0])

        latestRecordDates.push(latestDate.getDate()+'/'+(latestDate.getMonth()+1)+'/'+latestDate.getFullYear())

      }
      latestRecords.forEach(item => {overallSuccess += item;});
    } 

    console.log('RECORDS', latestRecords)
    console.log('DATES', latestRecordDates)
    console.log(spoofAccuracy)
  } else {
      overallSuccess = 100*lastscore
      let timeFinished = new Date(lastdate)
      let formattedDate = timeFinished.getDate()+'/'+(timeFinished.getMonth()+1)+'/'+timeFinished.getFullYear()
      lastdate = formattedDate
    }



  if (!webView){
    ScreenOrientation.lockAsync(2); //PROFILE
  } 
  
  const TableRowGenerator = () => {
    let rowGenerated = []
    rowGenerated.push( <DataTable.Header style={styles.tableHeader}>
    <DataTable.Title>Level</DataTable.Title>
    <DataTable.Title>Correct Rate</DataTable.Title>
    <DataTable.Title>Date</DataTable.Title>
  </DataTable.Header>)
  
    for (let i=0; i<spoofGameSets[gameName].length;i++){
      rowGenerated.push( <DataTable.Row>
      <DataTable.Cell>{i+1}. {spoofGameSets[gameName][i]}</DataTable.Cell>
      <DataTable.Cell>{latestRecords[i]?(100*spoofAccuracy['0'][latestRecords[i]]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
      <DataTable.Cell>{latestRecordDates[i]?(latestRecordDates[i]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell>
    </DataTable.Row> )
      }
    return(
      <DataTable style={styles.container}>
      {rowGenerated}
        <DataTable.Row>
            <DataTable.Cell>SCORE</DataTable.Cell>
            <DataTable.Cell>{overallSuccess}%</DataTable.Cell>
            <DataTable.Cell>{lastdate}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

       
    )
  }
  
  // <SafeAreaView style={{...styles.webContainer}}> 
    //         <View style={{...styles.webContent}}>   
  return (
  

    <View>
        <View padding={40}></View>
        <Text style={{fontSize:50, marginLeft:30}}> Score</Text>
        <Text style={{fontSize:30, marginLeft:30}}> IN {gameName.toUpperCase()} GAME</Text>
        {(!data)?<Text style={{fontSize:20, marginLeft:30}}> (WORKS WITHOUT BUGS WHEN SIGNED IN)</Text>:<View></View>}
        <View padding={30}></View>
      {/* <DataTable style={styles.container}> */}
        {/* <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Level</DataTable.Title>
          <DataTable.Title>Correct Rate</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>
        
        <DataTable.Row>
          
          <DataTable.Cell>1. {spoofGameSets[gameName][0]}</DataTable.Cell>
          <DataTable.Cell>{latestRecords[0]?(latestRecords[0]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
          <DataTable.Cell>{latestRecordDates[0]?(latestRecordDates[0]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell>
        </DataTable.Row>
    
        <DataTable.Row>
          
          <DataTable.Cell>2. {spoofGameSets[gameName][1]}</DataTable.Cell>
          <DataTable.Cell>{latestRecords[1]?(100*spoofAccuracy['0'][latestRecords[1]]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
          <DataTable.Cell>{latestRecordDates[1]?(latestRecordDates[1]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          
          <DataTable.Cell>3. {spoofGameSets[gameName][2]}</DataTable.Cell>
          <DataTable.Cell>{latestRecords[2]?(100*spoofAccuracy['0'][latestRecords[2]]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
          <DataTable.Cell>{latestRecordDates[2]?(latestRecordDates[2]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>4. {spoofGameSets[gameName][3]}</DataTable.Cell>
          <DataTable.Cell>{latestRecords[3]?(100*spoofAccuracy['0'][latestRecords[3]]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
          <DataTable.Cell>{latestRecordDates[3]?(latestRecordDates[3]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell>
        </DataTable.Row> */}

        <TableRowGenerator></TableRowGenerator>

        {/* <DataTable.Row>

          <DataTable.Cell>{gameName.toUpperCase()} GAME</DataTable.Cell>
          <DataTable.Cell>{overallSuccess}%</DataTable.Cell>
          <DataTable.Cell>{lastdate}</DataTable.Cell>
        </DataTable.Row> */}
      {/* </DataTable> */}
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
    // </View>
    // </SafeAreaView>    

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
    // WEB VIEW
    webContainer: {
      flex: 1,
      marginBottom: 200,
      alignItems: "center",
      justifyContent: "center", 
    },
    webContent: {
      width: "100%",
      maxWidth: 400,
      maxHeight: 1000,
    },
});