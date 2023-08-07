import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { spoofGameFolders, spoofGameSets } from '../gameFile';
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
    ScreenOrientation.lockAsync(6); //PROFILE
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

  const SpeciesTableGenerator = () => {
    let rowGenerated = []
    rowGenerated.push( <DataTable.Header style={styles.tableHeader}>
    <DataTable.Title>Level</DataTable.Title>
    <DataTable.Title>Correct Rate</DataTable.Title>
    <DataTable.Title>Date</DataTable.Title>
  </DataTable.Header>)
  
    for (let i=0; i<spoofGameFolders[gameName][gameName+"_ALL"].length;i=i+3){
      rowGenerated.push( <DataTable.Row >
      <DataTable.Cell> ✔️ {spoofGameFolders[gameName][gameName+"_ALL"][i]}</DataTable.Cell>
      <DataTable.Cell> 🔲 {spoofGameFolders[gameName][gameName+"_ALL"][i+1]}</DataTable.Cell>
      <DataTable.Cell> 🔲 {spoofGameFolders[gameName][gameName+"_ALL"][i+2]}</DataTable.Cell>

      {/* <DataTable.Cell>{latestRecords[i]?(100*spoofAccuracy['0'][latestRecords[i]]).toFixed(2)+'%':"Sign In"}</DataTable.Cell>
      <DataTable.Cell>{latestRecordDates[i]?(latestRecordDates[i]):(loggedIn)?"Not attempted":"Sign In"}</DataTable.Cell> */}
    </DataTable.Row> )
      }
    return(
      <DataTable rowHeight={17} backgroundColor='rgba(102, 140, 190, 1)'>
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
  

    <View style={{backgroundColor:'black'}}>
        <View padding={20}></View>
        <Text>
          <Text style={{color: 'white', fontSize:40, marginLeft:30}}> {gameName} </Text><Text style={{color: 'white', fontSize:20}}> SCORE</Text>
        </Text>
        {(!data)?<Text style={{color: 'white', fontSize:20, marginLeft:30}}> (No user data detected)</Text>:<View></View>}
        <View padding={5}></View>

        <Text style={{color: 'white', fontSize:20, marginLeft:30}}>{spoofGameFolders[gameName][gameName+"_ALL"].join(false?' ✔️':' 🔲')}</Text>
        {/* <SpeciesTableGenerator></SpeciesTableGenerator> */}

        <TableRowGenerator></TableRowGenerator>
        <View padding={10}></View>
      <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  navigation.replace("Selection")
                }}>
                  <Text style={{color: 'white', fontWeight:"bold"}}> {"\n CHANGE GAME"} </Text>
      </TouchableOpacity>  
      <View padding={500}></View>
      {/* </View> */}
    </View>

    
  );
    // </View>
    // </SafeAreaView>    

};
  
export default TableExample;
  
const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor:'rgba(102, 140, 190, 1)',
    rowHeight:12
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },

  gameSelection: {

    justifyContent: "flex-start",
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop:1,
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