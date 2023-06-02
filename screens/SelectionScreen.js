import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react'
import { auth, firebase } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'


import Orientation, { LANDSCAPE_LEFT, OrientationLocker } from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';
ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
const SelectionScreen = ({ navigation }) => {
    // Orientation.lockToLandscape();
    

    return (
      
      <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{width: '102%', left: '-2%',  height: '120%', top: '-5%'}}>
  
      {/* <VideoRecorder
          onRecordingComplete={(videoBlob) => {
            // Do something with the video...
            console.log('videoBlob', videoBlob)
          }}
        /> */}
  
      <ScrollView contentContainerStyle= {styles.gameRow}>
  
        {/* "BONES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Dogs' })}
        >
          <ImageBackground source={require('../assets/triceratops_skull.jpg')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Dogs'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>      

        {/* "BONES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Bones' })}
        >
          <ImageBackground source={require('../assets/triceratops_skull.jpg')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Bones'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>          
  
        {/* "BONES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Dragonflies' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Dragonflies'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>
  
  
  
  
        {/* "CREATURES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Creatures' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Creatures'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>        
  
        {/* "CRABS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Crabs' })}
        >
          <ImageBackground source={require('../assets/crab.jpg')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Crabs'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>     
  
        {/* "REPTILES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Reptiles' })}
        >
          <ImageBackground source={require('../assets/crab.jpg')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Reptiles'} </Text>
          </ImageBackground>
          
        </TouchableOpacity>   
  
        {/* "3D" BUTTON */}
        {/* <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('TEST_3D_SCENE', { name: '3D' })}
        >
          <ImageBackground source={require('./assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: '4'}} imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'3D'} </Text>
          </ImageBackground>
        </TouchableOpacity>     */}
  
        {/* "ENGINES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Engines' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Engines'} </Text>
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "CARS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Cars' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Cars'} </Text>
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "TURTLES" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Turtles' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Turtles'} </Text>
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "WEAPONRY" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Weaponry' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Weaponry'} </Text>
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Pokemon' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen02.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Pokemon'} </Text>
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Fish' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Fish'} </Text>
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'Mustaches' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'Mustaches'} </Text>
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity
          style={styles.gameSelection}
          onPress={() => navigation.navigate('Home', { name: 'LivingRoom' })}
        >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={{flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4}} 
          imageStyle={{ borderRadius: 60, borderWidth: 4, borderColor: 'black'}}>
            <Text style ={styles.gameText}> {'LivingRoom'} </Text>
          </ImageBackground>
        </TouchableOpacity> 
  
      </ScrollView>
      
  
  
      </ImageBackground>

  )
}

export default SelectionScreen


var styles = StyleSheet.create({
    gameSelection: {
      left: '0%',
      top: '5%',
      // justifyContent: "flex-start",
      // alignItems: 'center',
      width: 140,
      height: 150,
      backgroundColor:'rgba(144, 144, 0, 0.8)',
      // justifyContent: 'space-evenly',
      borderRadius: 50,
      flexWrap: "wrap"
    },
  
    gameText: {
    //   fontFamily:"Cochin", 
      fontSize:20,
      top:'25%',
      color: 'white',
      textAlign: 'center'
    },
  
    gameRow: {
      top: '5%',
      left: '50%',
      width: '70%',
      height: '130%', 
      flexDirection : 'row', 
      justifyContent: 'space-evenly',
      flexWrap: "wrap"
    },
  
    modalRow: {
      top: '-70%',
      width: '600%',
      height: '100%', 
      flexDirection : 'column', 
      justifyContent: 'space-evenly',
    },
  
  
    floatingExit: {
      left: '0%',
      top: '0%',
      // justifyContent: "flex-start",
      alignItems: 'center',
      // width: 300,
      // height: 80,
      // backgroundColor:'rgba(144, 144, 0, 0.8)',
      borderRadius: 50    
    },
  
    // overScreen: {
    //   // flex:1,
    //   // alignItems: 'stretch', // THIS IS THE FUCKING IMPOSTOR
    //   justifyContent: 'center',
    //   position: 'absolute',
    //   left: '85%',          //0% FOR WHEN THE BOTTOM BAR ANSWERS IS ACTIVE
    //   top: '90%',//150 //40% FOR WHEN THE BOTTOM BAR ANSWERS IS ACTIVE
    //   width: '10%',//100
    //   height: '7%',
    //   backgroundColor:'rgba(255, 0, 0, 0.8)',
    // },
  
    exitButtonRed: {
      justifyContent: "flex-start",
      alignItems: 'center',
      width: 30,
      height: 30,
      backgroundColor:'red',
    },
    container: {
      // flex: 1, //EDIT TESTS
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },
  
    center: {
      width: '100%',
      height: '120%',  // 40 Set for Question Window | 90 Set for Close Inspection window //TBD> Don't edit this...
  
      //for buttons layout
      flexDirection : 'row', 
      justifyContent: 'space-between',
    },
    behind: {
      // flex:1,
      // alignItems: 'stretch', // THIS IS THE FUCKING IMPOSTOR
      justifyContent: 'center',
      // position: 'absolute',
      left: '0%',          //0% FOR WHEN THE BOTTOM BAR ANSWERS IS ACTIVE
      top: '20%',//150 //40% FOR WHEN THE BOTTOM BAR ANSWERS IS ACTIVE
      width: '95%',//100
      height: '100%'
    },
  
    questionBar: {
      // width: '100%',
      height: 140, //OVERRIDDEN. 100% for scrollview | 170 ie 70% for full non scroll | 40 for lower bar.
      backgroundColor:'#ffffff',
      display:'flex',
      // flexWrap: 'wrap',
      // flex: 1,
      flexDirection:'column',
      // alignItems:'center',
      justifyContent:'space-evenly'
    },
    exitButton: {
      width: '90%',
      height: '90%',//OVERRIDDEN. 300 for full but overriden, //40 for lower bar.
      backgroundColor:'#ffffff',
      // flex: 1, // Culprit of overriden.
      display:'flex',
      flexWrap: 'wrap',
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    // exitButton: {
    //   // height: "300px",
    //   width:"20%",
    //   display:'flex',
    //   flexWrap: 'wrap',
    //   flexDirection:'row',
    // },
    outerContainer : {
      flex : 1,
      flexDirection : 'column',
    },
    f1: {flex: 1},
    helloWorldTextStyle: {
      fontFamily: 'SansSerif',
      fontSize: 30,
      color: 'black',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    rowSetup: {
      // width: '90%',
      flexDirection: 'row'
    },
    controlsView: {
      width: '90%',
      height:'100%',
      backgroundColor:'#ffffff',
      display:'flex',
      flexWrap: 'wrap',
      flexDirection:'row',
      // alignItems:'center',
      justifyContent:'space-evenly'
    },
    text: {
      margin:0,
      backgroundColor:'#9d9d9d',
      padding:10,
      fontWeight:'bold'
    },
    descriptionText: {
      margin:0,
      backgroundColor:'#ffffff',
      padding:0,
      fontWeight:'bold'
    },
    image: {
      margin:0,
      backgroundColor:'#ffffff',
      padding:0,
      height:20,
      width: 20
      // fontWeight:'bold'
    },
    joystickContainer : {
      position : 'absolute',
      height: 100,
      width: 200,
      marginBottom: 200,
      marginLeft : 650,
      bottom : 10, 
      left : 10,
    },
    sideButton: {
      borderRadius: 300,
      height: 800,
      width:20,
      alignContent: 'stretch',
      top:200,
      backgroundColor: "rgba(149, 144, 0, 0.2)",
      // padding: 10
    },
  })