import { Button, Image, ImageBackground, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { Linking } from 'react-native';
import { getDownloadURL, list, ref } from 'firebase/storage'
import { SearchBar } from 'react-native-elements'
import { spoofGameHashtags, spoofGameSets } from '../gameFile'
import AsyncStorage from '@react-native-async-storage/async-storage'

const webView = (Platform.OS == 'web') // testing with 'web' or 'android'

const SelectionScreen = ({ navigation }) => {
    // Orientation.lockToLandscape();
    const toast = useRef(null);
    const [userData, setUserData] = useState()
    const [gameName, setGameName] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [thumbnailImage, setThumbnailImage] = useState([])
    const [outcomeImage, setOutcomeImage] = useState({})
    const [hintImages, setHintImages] = useState([])
    const [searchValue, setSearchValue] = useState()
    const [searchResult, setSearchResult] = useState([])
    let thumbnailBg = webView?(styles.imageBackgroundWeb):(styles.imageBackgroundMobile)
    let thumbnailStyle = webView?(styles.imageStyleWeb):(styles.imageStyleMobile)
    if (!webView){
      ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
    } 
    
    const userLoggedIn = AsyncStorage.getItem('@TestUser:key');
    console.log('accountuser: ', userLoggedIn)
    // if (auth !== null){
    //   // We have data!!
    //   console.log(auth);
    // }
    
    useEffect(()=>{

     // Query All User Data here.
    //  if (auth.currentUser) {
    //   const userDataRef = ref_d(database, auth.currentUser.email.split('.')[0] );

    //   onValue(userDataRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data){
    //           console.log('User Data is now:', data)
    //           setUserData(data)
    //         }
            
    //       })
    //   } 

    // Query Outcome and Hints here.

    
    const getOutcomeImages = async() => {
        let gameKeyList = Object.keys(spoofGameSets)
        for (let j=0;j<gameKeyList.length; j++){
          // for (let i=0;i<gameKeyList[j].length; i++) {
            const outcomesReference = ref(storage, gameKeyList[j]+'/_outcomes/');
            // spoofGameSets[gameKeyList[j]][i]
            await list(outcomesReference)
            .then((res) => {
              res.items.forEach((itemRef) => {
            
            getDownloadURL(itemRef).then((x)=> {
              console.log(gameKeyList[j], ' : ', x)
                setOutcomeImage(previous => {
                  previous[gameKeyList[j]]=x
                  return previous});
            })
            if (outcomeImage==undefined) {
                console.log('Error on one.')
            }

          })

        })

          // }
        }
        }

       
    getOutcomeImages()

    const getThumbnailImage = async() => {
      let gameKeyList = Object.keys(spoofGameSets)
      for (let j=0;j<gameKeyList.length; j++){
        // for (let i=0;i<gameKeyList[j].length; i++) {
          const thumbReference = ref(storage, gameKeyList[j]+'/_thumbnail/');
          // spoofGameSets[gameKeyList[j]][i]
          await list(thumbReference)
          .then((res) => {
            res.items.forEach((itemRef) => {
          
          getDownloadURL(itemRef).then((x)=> {
            console.log(gameKeyList[j], ' : ', x)
            setThumbnailImage(previous => [...previous, x]);
          })
          if (thumbnailImage==undefined) {
              console.log('Error on one.')
          }

        })

      })

        // }
      }
      }
  
    getThumbnailImage()
    

    }, [])

    // On Game click, load the next page (Hints)
    useEffect(()=>{

      // Query All User Data here.
      if (auth.currentUser) {
       const userDataRef = ref_d(database, auth.currentUser.email.split('.')[0] );
 
       onValue(userDataRef, (snapshot) => {
             const data = snapshot.val();
             if (data){
               console.log('User Data is now:', data)
               setUserData(data)
             }
             
           })
       } 
     // Query Outcome and Hints here.

     const getHintImages = async() => {

         // for (let i=0;i<gameKeyList[j].length; i++) {
           const hintReference = ref(storage, gameName+'/_hints/');
           // spoofGameSets[gameKeyList[j]][i]
           await list(hintReference)
           .then((res) => {
             res.items.forEach((itemRef) => {
           getDownloadURL(itemRef).then((x)=> {
             setHintImages(previous => [...previous, x]);
           })
           if (hintImages==undefined) {
               console.log('Error on one.')
           }
 
         })
 
       })

       }
   
       getHintImages()
     
 
     }, [gameName])

    const handleSignOut = async () => {
      // await AsyncStorage.clear()
      
        auth
          .signOut()
          .then(()=> {
            // clearAsyncStorage().then(()=>{
            //   const userLoggedIn = AsyncStorage.getItem('@TestUser:key');
            //   console.log('################# aaaand')
            //   if (userLoggedIn !== null){
            //     // We have data!!
            //     console.log('################# that worked')
            //     return
            //   }
              navigation.replace("Login")
              
          // }).catch(error =>alert(error.message))
      })
      
    }
    const clearAsyncStorage = async() => {
      AsyncStorage.clear();
    }
    const handleLogin = async () => {
      // await AsyncStorage.clear()
      AsyncStorage.getAllKeys().then(data => console.log('AsyncStorage is ', data));
      clearAsyncStorage().then(()=>{
      navigation.replace('Login')})
    }

    const plsCreateAccount = () => {
      toast.current.show('Create an account to unlock this course ! ', { type: "success" });
    }

    const plsAwaitRelease = () => {
      toast.current.show('Course released soon ! ', { type: "success" });
    }

    const updateSearch = (search) => {
      toast.current.show('Search is off ! ', { type: "success" });
      setSearchValue(search)
      // Searchbar functionality
      for (const [key, value] of Object.entries(spoofGameHashtags)) {
        if (value.toLowerCase().split(" ").includes(searchValue.toLowerCase())) {
          setSearchResult(prev=> [...prev, key])
          console.log(key)
        }
      }
    }
//  <SafeAreaView style={{...styles.webContainer}}> 
//              <View style={{...styles.webContent}}>    
    return (
       
      
      <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{width: '102%', left: '-2%',  height: '120%', top: '-5%'}}>
      <Toast ref={toast}  />
      
      <View style={{flex: 1, flexDirection:"column"}}>
      
      {/* <View style={{flex: 1, flexDirection:"row", alignContent:'space-between'}}> 
<TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={{flex:2}}></View>
      
      

      


      
      
      
      </View> */}
      <View style={{flex: 6, flexDirection: 'row', justifyContent: 'center'}}>
      
      <View style={{flex: 6, flexDirection: 'column', justifyContent: 'center'}}>

      <Text  style={{color: '#b6dbd8'}} marginTop={220} marginLeft={20} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfUEBELjhxyWh9OnZihgpEBbdzfSr1nO1hb5atfWFZfEsZgzg/viewform?usp=sf_link')}>
        {'Send suggestions \n to the team'} 
      </Text>
      <View padding={20}></View>
      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}> <!--(auth.currentUser)?handleSignOut: */}
      
      <TouchableOpacity style={styles.button} onPress={(auth.currentUser)?handleSignOut:handleLogin}> 
              <Text style={styles.buttonText}>{(auth.currentUser)?"Sign Out":"Login"}</Text>
      </TouchableOpacity>
      </View>
      {/* <Text marginTop={200} marginLeft={100} onPress={() => Linking.openURL('http://google.com')}>dfsfsd ddddd

      </Text> */}
    <View style={{flexDirection: 'column'}}>
      <View padding={20}></View>
    <SearchBar
              placeholder="What will you learn today?"
              inputStyle={{backgroundColor: 'white'}}
              containerStyle={{backgroundColor: 'white', borderColor: 'black', borderWidth: 70, borderRadius: 10}}
              // placeholderTextColor={'#000000'}
              onChangeText={updateSearch}
              value={searchValue}

            />
      <ScrollView  contentContainerStyle= {styles.gameRow}>

      
        {/* <Image source={{outcomeImage}} style={{height:170, width:130}}></Image> */}
        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Dogs')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[0]}`}} 
            style={thumbnailBg} imageStyle={thumbnailStyle}>
            <Text style ={styles.gameText}> {'Dogs'} </Text>
          </ImageBackground>     
        </TouchableOpacity>      

        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Cheeses')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[1]}`}} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Cheeses'} </Text>
          </ImageBackground>
        </TouchableOpacity>          
  
        {/* "BONES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Africa')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[2]}`}}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Africa'} </Text>
          </ImageBackground>    
        </TouchableOpacity>
  
        {/* "CREATURES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Animal tracks')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[3]}`}}
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
          <ImageBackground source={require('../assets/thumbnails/berries.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Berries'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground> 
        </TouchableOpacity>   
  
        {/* "ENGINES" BUTTON */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={{uri:`${outcomeImage[0]}`}} 
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
      </View>
      </View>
      </View>

      {/* MODAL IF modalVisible */}
      <Modal
      animationType="slide"
      transparent={true}
      // backgroundColor='rgba(22, 160, 133, 0.8)'
      visible={modalVisible} //instead of on state change modalVisible
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      >

    {/* SAFE AREA !! */}
     {/* <SafeAreaView style ={styles.webContainer}>
        <View style ={styles.webContent}>    */}

<View backgroundColor='rgba(46, 204, 113, 0.8)'>
          {/* <View style={{ flexDirection:"row"}}> */}
            {/* <View padding={400} ></View> */}
          
            <View style={styles.modalRow}>

            <View flexDirection='column' marginBottom={3300}>
              {(auth.currentUser)?
              <TouchableOpacity
                    style={styles.gameSelection}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Home', { 
                        name: gameName, 
                        hint: hintImages, 
                        level: userData['Animal tracks']['gameSetLevel'], 
                        data: userData })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n CONTINUE GAME"} </Text>
                  </TouchableOpacity>  
:<View></View>}
                  <TouchableOpacity
                    style={styles.gameSelection}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Home', { 
                        name: gameName, 
                        hint: hintImages, 
                        level: 0, 
                        data: 0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n START FROM BEGINNING"} </Text>
                  </TouchableOpacity>  
            
            
                  
                
                  <TouchableOpacity
                    style={styles.gameSelection}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Score', { // The population average can be computed by cloud functions
                        name: gameName,
                        hint: hintImages, 
                        level: (auth.currentUser)?userData['Animal tracks']['gameSetLevel']:0, 
                        data: (auth.currentUser)?userData:0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n RANKING"} </Text>
                  </TouchableOpacity>  
                
                  <TouchableOpacity
                    style={styles.gameSelection}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                      <Text style={{fontWeight:"bold"}}> {"\n BACK"} </Text>
                  </TouchableOpacity>  
            </View>
            
            
              {/* <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  setModalVisible(!modalVisible);

                  navigation.navigate('Selection')
                }}>
      
                <Text> {"\n EXIT TO GAME SELECTION"} </Text>
              </TouchableOpacity> */}
              <Image source={{uri:`${outcomeImage[gameName]}`}} style={{height:300, width:500, marginLeft:-10}}></Image>
            
            
              

            {/* </View> */}

          </View>
      </View>

      {/* </View>

     </SafeAreaView>  */}
      </Modal>


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


      
{/* <View backgroundColor='rgba(46, 204, 113, 0.8)'>

          
<View style={styles.modalRow}>

  <TouchableOpacity
    style={styles.gameSelection}
    onPress={() => {
      setModalVisible(!modalVisible);

      // TBD | OUTCOMES VISUAL
    }}>
    <Text color="red">{"In this game, you learn to:"}</Text> 

  </TouchableOpacity>

  


  <TouchableOpacity
    style={styles.gameSelection}
    onPress={() => {
      setModalVisible(!modalVisible);
      navigation.navigate('Home', { 
        name: 'Animal tracks', 
        level: (auth.currentUser)?userData['Animal tracks']['gameSetLevel']:0, 
        data: (auth.currentUser)?userData:0 })
    }}>
      <Text style={{fontWeight:"bold"}}> {"\n START GAME"} </Text>
  </TouchableOpacity>  

  

  <TouchableOpacity
    style={styles.gameSelection}
    onPress={() => {
      setModalVisible(!modalVisible);
    }}>
      <Text style={{fontWeight:"bold"}}> {"\n BACK"} </Text>
  </TouchableOpacity>  

  
  <Image source={{outcomeImage}} style={{height:2000, width:3030, marginLeft:15}}></Image>

{/* </View> */}

// </View>
// </View> */}

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
      top: '20%',
      // justifyContent: "flex-start",
      justifyContent: 'space-around',
      alignItems: 'center',
      alignContent: 'space-around',
      width: 170,
      height: 90,
      backgroundColor:'rgba(144, 144, 0, 0.8)',
      // justifyContent: 'space-evenly',
      borderRadius: 50,
      flexWrap: "wrap"
    },
  
    gameText: {
    //   fontFamily:"Cochin", 
      fontSize:13,
      top:'25%',
      color: 'black',
      backgroundColor: 'rgba(255, 255, 255, 0.6)', 
      textAlign: 'center',
      textAlignVertical: 'center'
    },
  
    gameRow: {
      top: '5%',
      left: '20%',
      width: '70%',
      height: '130%', 
      flexDirection : 'row', 
      justifyContent: 'space-evenly',
      flexWrap: "wrap"
    },
  
    modalRow: {
      top: '0%',
      width: '100%',
      height: '100%', 
      flexDirection : 'row', 
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
      
    },
    button: {
      flex:1,
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontWeight: '700', 
      fontSize: 16,
  },
    // END OF WEB VIEW.
  })