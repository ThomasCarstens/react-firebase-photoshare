import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { spoofGameFolders, spoofGameSets } from '../gameFile';
import { auth } from '../firebase';
import { Svg, G, Rect } from 'react-native-svg'
import BarChart from '../Components/BarChart.js';
// import { LineChart } from "react-native-gifted-charts";

const TableExample = (props) => {
  const navigation = useNavigation();
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'
  const loggedIn = auth.currentUser
  const gameName = props.route.params?.name 
  const macroName = props.route.params?.macroName 
  const lastscore = props.route.params?.lastscore  
  let lastdate = props.route.params?.lastdate  
  const data = props.route.params?.data  
  let latestRecords = [];
  let latestRecordDates = [];
  let overallSuccess = 0
  if (data){
    const spoofAccuracy = data[gameName]['accuracy']
    const allAccuracyAttempts = data[gameName][macroName]['accuracy']
    
    var spoofGameData = []
    for (let level=1 ; level<Object.keys(allAccuracyAttempts).length+1 ; level++) {
      levelAttempts = allAccuracyAttempts[level]
      for (const [key, value] of Object.entries(levelAttempts)) {
        console.log(levelAttempts[key]['time'], levelAttempts[key]['correct'])
        spoofGameData.push({label: levelAttempts[key]['time'], value: levelAttempts[key]['correct']})
      }
    }



    // if (spoofAccuracy){
    //   for (let level=0; level<Object.keys(spoofAccuracy).length; level++){
    //     let timeArray = Object.keys(spoofAccuracy[level]).map(each=> parseInt(each))
    //     timeArray.sort();
    //     latestRecords.push(100*spoofAccuracy[level][timeArray[0]])
    //     let latestDate = new Date(timeArray[0])

    //     latestRecordDates.push(latestDate.getDate()+'/'+(latestDate.getMonth()+1)+'/'+latestDate.getFullYear())

    //   }
    //   latestRecords.forEach(item => {overallSuccess += item;});
    // } 

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
  const testData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
  const testData4=[ {value:50}, {value:80}, {value:90}, {value:70} ]
  // const scale = scaleLog().base(10).nice();
  const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };
  const testData3 = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 312 },
    { label: 'Mar', value: 424 },
    { label: 'Apr', value: 745 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 434 },
    { label: 'Jul', value: 650 },
    { label: 'Aug', value: 980 },
    { label: 'Sep', value: 123 },
    { label: 'Oct', value: 186 },
    { label: 'Nov', value: 689 },
    { label: 'Dec', value: 643 }
  ]
  const SVGHeight = 60
  const SVGWidth = 60
  const graphHeight = 50
  const testData2 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 8],
    type: 'scatter',
  };
  const layout = { title: 'My cool chart!' };
  // const Shadow = ({ line }) => (
  //     <Path
  //         key={'shadow'}
  //         y={2}
  //         d={line}
  //         fill={'none'}
  //         strokeWidth={4}
  //         stroke={'rgba(134, 65, 244, 0.2)'}
  //     />
  // )
  
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
  

    <View >
        <View padding={20}></View>
        <Text>
          <Text style={{color: 'black', fontSize:40, marginLeft:30}}> {gameName} </Text><Text style={{color: 'black', fontSize:20}}> SCORE</Text>
        </Text>
        {(!data)?<Text style={{color: 'black', fontSize:20, marginLeft:30}}> (No user data detected)</Text>:<View></View>}
        <View padding={5}></View>

        {/* <Text style={{color: 'white', fontSize:20, marginLeft:30}}>{spoofGameFolders[gameName][gameName+"_ALL"].join(false?' ✔️':' 🔲')}</Text> */}
        {/* <SpeciesTableGenerator></SpeciesTableGenerator> */}
      <View style={styles.graphContainer}>
        <BarChart data={data} gameName={gameName} macroName={macroName} round={1} unit="€"/>
      </View>
        {/* <TableRowGenerator></TableRowGenerator> */}
        <View padding={80}></View>
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
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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