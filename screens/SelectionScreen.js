import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import {useState, useEffect} from 'react'
import { auth, firebase } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'


import Orientation, { LANDSCAPE_LEFT, OrientationLocker } from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-web';
import Toast from 'react-native-fast-toast';
import { ref as ref_d, set, get, onValue } from 'firebase/database'
import { storage, database } from '../firebase'


const webView = (Platform.OS == 'web') // testing with 'web' or 'android'

const SelectionScreen = ({ navigation }) => {
    // Orientation.lockToLandscape();
    const toast = useRef(null);
    const [userData, setUserData] = useState()
    let thumbnailBg = webView?(styles.imageBackgroundWeb):(styles.imageBackgroundMobile)
    let thumbnailStyle = webView?(styles.imageStyleWeb):(styles.imageStyleMobile)
    if (!webView){
      ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
    } 

    // Query All User Data here.
    useEffect(()=>{
     if (auth.currentUser) {
      const userDataRef = ref_d(database, auth.currentUser.email.split('.')[0] );

      onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data){
              console.log('profile pic now is:', data)
              setUserData(data)
            // setGameSetLevel(data.gameSetLevel)
            }
            
          })
    } 
    }, [])
    
    const plsCreateAccount = () => {
      toast.current.show('Create an account to unlock this course ! ', { type: "success" });
    }

    const plsAwaitRelease = () => {
      toast.current.show('Course released soon ! ', { type: "success" });
    }

//  <SafeAreaView style={{...styles.webContainer}}> 
//              <View style={{...styles.webContent}}>    
    return (
       
      
      <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{width: '102%', left: '-2%',  height: '120%', top: '-5%'}}>
      <Toast ref={toast} marginBottom={200} />
      <ScrollView contentContainerStyle= {styles.gameRow}>
      
        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => navigation.navigate('Home', { name: 'Dogs' })}>
          <ImageBackground source={require('../assets/triceratops_skull.jpg')} 
            style={thumbnailBg} imageStyle={thumbnailStyle}>
            <Text style ={styles.gameText}> {'Dogs'} </Text>
          </ImageBackground>     
        </TouchableOpacity>      

        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => navigation.navigate('Home', { name: 'Cheeses' })}>
          <ImageBackground source={require('../assets/triceratops_skull.jpg')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Cheeses'} </Text>
          </ImageBackground>
        </TouchableOpacity>          
  
        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => navigation.navigate('Home', { name: 'Africa' })} >
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Africa'} </Text>
          </ImageBackground>    
        </TouchableOpacity>
  
        {/* "CREATURES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => navigation.navigate('Home', { name: 'Animal tracks', level: userData['Animal tracks']['gameSetLevel'] })}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Animal tracks'} </Text>
            {/* {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>} */}
          </ImageBackground>  
        </TouchableOpacity>        
  
        {/* "CRABS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/crab.jpg')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Crabs'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity>     
  
        {/* "REPTILES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/crab.jpg')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Reptiles'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground> 
        </TouchableOpacity>   
  
        {/* "ENGINES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Engines'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "CARS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Cars'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "TURTLES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Turtles'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        {/* "WEAPONRY" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}> 
            <Text style ={styles.gameText}> {'Weaponry'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen02.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Pokemon'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile}  imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Fish'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Mustaches'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        {/* "FLOWERS" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'LivingRoom'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity> 
  
      </ScrollView>
      
  
      </ImageBackground>
   
  )
       {/* </View>
         </SafeAreaView>  */}
}

// COMPONENT-IN-COMPONENT DOES NOT WORK
// const SelectionScreen = ({ navigation }) => {
//     const ContainerForWeb = ({ navigation }) => {
//       <SafeAreaView style={{...styles.webContainer}}> 
//         <View style={{...styles.webContent}}>
//           <InsideSelectionScreen/>
//         </View>
//       </SafeAreaView>
//     }
//     const ContainerForMobile = ({ navigation }) => {
//         <View >
//           <InsideSelectionScreen/>
//         </View>
//     } 
    
//   if (webView) {
//     return (<ContainerForWeb/>)
//   } else {
//     return (<ContainerForMobile/>)
//   }
  
//   }



export default SelectionScreen
// this is an issue. Inside(...) is for android and SelectionScreen is for web.





var styles = StyleSheet.create({
  // THUMBNAILS: WEB
    imageStyleWeb: {
      borderRadius: 60, borderWidth: 4, borderColor: 'black'
    },
    imageBackgroundWeb: {
      flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4
    },
  // THUMBNAILS: MOBILE

    imageStyleMobile: {
      borderRadius: 60, borderWidth: 4, borderColor: 'black'
    },
    imageBackgroundMobile: {
      flex: 1, width: '100%', left: '0%',  height: '80%', top: '0%', borderRadius: 4
    },

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
  
  
    exitButtonRed: {
      justifyContent: "flex-start",
      alignItems: 'center',
      width: 30,
      height: 30,
      backgroundColor:'red',
    },
    container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      marginHorizontal: 300,
      marginVertical: 300,
    },
    emptyContainer: {
      padding: 20,
      flex: 1,
    },  
    center: {
      width: '100%',
      height: '120%',  // 40 Set for Question Window | 90 Set for Close Inspection window //TBD> Don't edit this...
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
    // WEB VIEW
    webContainer: {
      flex: 1,
      marginBottom: 200,
      alignItems: "center",
      justifyContent: "center", 
    },
    webContent: {
      width: "100%",
      maxWidth: 1000,
      maxHeight: 400,
    },
    lock: {
      width: "100%",
      width:60,
      height: 60,
      marginLeft: 40,
      marginTop:30
    },
    // END OF WEB VIEW.
  })