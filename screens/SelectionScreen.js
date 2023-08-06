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
import { spoofGameAllocation, spoofGameFolders, spoofGameHashtags, spoofGameMetrics, spoofGameSets, spoofMacroGameSets } from '../gameFile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Progress from 'react-native-progress';

const webView = (Platform.OS == 'web') // testing with 'web' or 'android'

const SelectionScreen = ({ navigation }) => {
    // Orientation.lockToLandscape();
    const toast = useRef(null);
    const [userData, setUserData] = useState()
    const [gameName, setGameName] = useState()
    const [gameType, setGameType] = useState()
    const [folderName, setFolderName] = useState()
    const [applicationName, setApplicationName] = useState()

    const [modalVisible, setModalVisible] = useState(false)
    const [applicationModalVisible, setApplicationModalVisible] = useState(false)
    const [thumbnailImage, setThumbnailImage] = useState([])
    const [outcomeImage, setOutcomeImage] = useState({})
    const [hintImages, setHintImages] = useState({})
    const [applicationImages, setApplicationImages] = useState({})
    const [searchValue, setSearchValue] = useState()
    const [searchResult, setSearchResult] = useState([])

    
    let thumbnailBg = webView?(styles.imageBackgroundWeb):(styles.imageBackgroundMobile)
    let thumbnailStyle = webView?(styles.imageStyleWeb):(styles.imageStyleMobile)
    if (!webView){
      ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
    } 
    
    // const userLoggedIn = AsyncStorage.getItem('@TestUser:key');
    // console.log('accountuser: ', userLoggedIn)
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
            let getHintNb = x.split('.jpg')[0]
            let index = getHintNb.charAt(getHintNb.length-1)
            console.log('hint', index)
             setHintImages(previous => {
              let dictHints = {...previous}
              dictHints[index] = x
              return dictHints
             });
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
      toast.current.show('Log in to access ! ', { type: "success" });
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

    function ApplicationsBlock() {
      let ApplicationsButtons = [];
      // console.log('#### folder name is ', folderName)
      let metricList = Object.keys(spoofGameMetrics[folderName])
      // console.log('### metricList: ', metricList)
      for (let metric_i = 0; metric_i<metricList.length; metric_i++){
        let nextButton =      (  <TouchableOpacity

                style={styles.gameSelectionModal}

                onPress={() => {
                  setApplicationName("Dog hunting situations")
                  setApplicationModalVisible(!applicationModalVisible);
                  // Navigate if game is allocated.

                  if (spoofGameAllocation[metricList[metric_i]]){

                    navigation.navigate(spoofGameAllocation[metricList[metric_i]], { 
                      name: metricList[metric_i],
                      folder: folderName,
                      gameIsThreaded: 0,
                      hint: hintImages, 
                      level: (auth.currentUser)?userData[gameName]['gameSetLevel']:0, 
                      application: applicationImages,
                      applicationName: metricList[metric_i],
                      data: (auth.currentUser)?userData:0 })
                  } else 
                  { plsAwaitRelease()
                  }
                }}>
                  <Text style={{fontWeight:"bold"}}> {"\n"+metricList[metric_i]} </Text>
          </TouchableOpacity>  )
        
        ApplicationsButtons.push(nextButton)

    }

      return(
        ApplicationsButtons
      )
    
    }


//  <SafeAreaView style={{...styles.webContainer}}> 
//              <View style={{...styles.webContent}}>    
    return (
        
      
      <ImageBackground source={require('../assets/bg/loadingscreen01.png')} style={{width: '102%', left: '-2%',  height: '120%', top: '-5%'}}>
      {/* initial toast location */}
      <Toast ref={toast}  style={styles.toastPosition}/>
      <View style={{flex: 1, flexDirection:"column"}}>
      
      {/* <View style={{flex: 1, flexDirection:"row", alignContent:'space-between'}}> 
<TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={{flex:2}}></View>
      
      

      


      
      
      
      </View> */}
      <View style={{flex: 6, flexDirection: 'row', justifyContent: 'center'}}>
      
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <Text  style={{color: '#b6dbd8', fontSize:20}} marginTop={135} marginLeft={(webView)?200:20} >
        {'Cultivate'} 
      </Text>

      <Text  style={{color: '#b6dbd8'}} marginTop={45} marginLeft={(webView)?200:20} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfUEBELjhxyWh9OnZihgpEBbdzfSr1nO1hb5atfWFZfEsZgzg/viewform?usp=sf_link')}>
        {'Send suggestions \n to the team'} 
      </Text>
      <View padding={20}></View>
      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}> <!--(auth.currentUser)?handleSignOut: */}
      
      <TouchableOpacity style={{...styles.button, marginLeft:(webView)?15:1}} onPress={(auth.currentUser)?handleSignOut:handleLogin}> 
              <Text style={styles.buttonText}>{(auth.currentUser)?"Sign Out":"Login"}</Text>
      </TouchableOpacity>
      </View>
      {/* <Text marginTop={200} marginLeft={100} onPress={() => Linking.openURL('http://google.com')}>dfsfsd ddddd

      </Text> */}
    <View style={{flex: 6, flexDirection: 'column'}}>
      <View padding={(webView)?100:20} marginTop={(webView)?200:2}></View>
      {/* TBD | SEARCH OPTIONS */}
    {/* <SearchBar
              placeholder="What will you learn today?"
              inputStyle={{backgroundColor: 'white'}}
              containerStyle={{backgroundColor: 'white', borderColor: 'black', borderWidth: 70, borderRadius: 10}}
              // placeholderTextColor={'#000000'}
              onChangeText={updateSearch}
              value={searchValue}

            /> */}
            
      <ScrollView  contentContainerStyle= {styles.gameRow}>

      
        {/* <Image source={{outcomeImage}} style={{height:170, width:130}}></Image> */}
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          // setGameName('Dogs')
          // setGameType("Home") 

          setGameName("Dogs")
          setFolderName("Dogs")
          setGameType('Home') //Sequence also possible / spoofMacroGameSets["Dogs"][1][1]
          setModalVisible(true)}}>
          <ImageBackground source={require('../assets/thumbnails/dogs.jpg')} 
            style={thumbnailBg} imageStyle={thumbnailStyle}>
            <Text style ={styles.gameText}> {'Dogs'} </Text>
          </ImageBackground>     
        </TouchableOpacity>      

        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Cheeses')
          setFolderName("Cheeses")
          setGameType('Home')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[1]}`}} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Cheeses'} </Text>
          </ImageBackground>
        </TouchableOpacity>          
  
        {/* <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Africa')
          setGameType('Home')
          setModalVisible(true)}}>
          <ImageBackground source={{uri:`${thumbnailImage[2]}`}}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Africa'} </Text>
          </ImageBackground>    
        </TouchableOpacity> */}
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          // setGameName('Animal tracks')
          // setGameType('Home')
          // setModalVisible(true)}}
          //LOCKED
          if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={{uri:`${thumbnailImage[3]}`}}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Animal tracks'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity>        

        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          
          // setGameName('Knots')
          // setGameType('Home')
          // setModalVisible(true)}}>
            //LOCKED
            if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>

          <ImageBackground source={{uri:`${thumbnailImage[4]}`}}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Knots'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity>        

        <TouchableOpacity style={styles.gameSelection} 
        // onPress={() => {
        //   setGameName('History')
        //   setGameType('Sequence')
        //   setModalVisible(true)}}>
          //LOCKED
          onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={{uri:`${thumbnailImage[5]}`}}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Timelines'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity>    

        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('Helicopters')
          setFolderName("Helicopters")
          setGameType('Home')
          setModalVisible(true)}}>
          <ImageBackground source={require('../assets/thumbnails/helicopter.jpg')}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Helicopters'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity> 

        <TouchableOpacity style={styles.gameSelection} onPress={() => {
          setGameName('French Bread')
          setFolderName("French Bread")
          setGameType('Home')
          setModalVisible(true)}}>
          <ImageBackground source={require('../assets/thumbnails/breads.png')}
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'French Bread'} </Text>
            {/* {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>} */}
          </ImageBackground>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/thumbnails/crabs.jpg')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Crabs'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>  
        </TouchableOpacity>     
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/thumbnails/berries.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Berries'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground> 
        </TouchableOpacity>   
  
        {/* <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={{uri:`${outcomeImage[0]}`}} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Engines'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Cars'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Turtles'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>  
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}> 
            <Text style ={styles.gameText}> {'Weaponry'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen02.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Pokemon'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile}  imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Fish'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'Mustaches'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity>    
  
        <TouchableOpacity style={styles.gameSelection} onPress={() => {if (auth.currentUser) {plsAwaitRelease()} else {plsCreateAccount()}}}>
          <ImageBackground source={require('../assets/bg/loadingscreen01.png')} 
          style={styles.imageBackgroundMobile} imageStyle={styles.imageStyleMobile}>
            <Text style ={styles.gameText}> {'LivingRoom'} </Text>
            {!auth.currentUser?<Image source={require('../assets/lock.png')} style={styles.lock}/>:<View></View>}
          </ImageBackground>
        </TouchableOpacity> 
   */}
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

<View backgroundColor='rgba(13, 1, 117, 0.8)'>
          {/* <View style={{ flexDirection:"row"}}> */}
            {/* <View padding={400} ></View> */}
          
            <View style={styles.modalRow}>

            <View flexDirection='column' marginBottom={3300}>

            <TouchableOpacity
                    style={styles.gameSelectionModal}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                      <Text style={{fontWeight:"bold"}}> {"\n BACK"} </Text>
            </TouchableOpacity> 
            
            <TouchableOpacity
                    style={styles.gameSelectionModal}
                    onPress={() => {
                      // setModalVisible(!modalVisible);
                    }}>
                      <View flexDirection='row'>
                        <Text style={{fontWeight:"bold", color:'rgb(50, 100, 1000)', fontSize:18, marginTop:-10}}> {"\n Hounds"} </Text>
                        
                        <Progress.Bar progress={0.8} color='rgb(13, 1, 117)' borderRadius={20} marginLeft={10} marginTop={10} width={140} height={30}>
                          <Text style={styles.modalProgressBarText}>31/40 Species</Text>
                        </Progress.Bar>
                      </View>
                      
            </TouchableOpacity> 

            <TouchableOpacity
                    style={styles.gameSelectionModal}
                    onPress={() => {
                      // setModalVisible(!modalVisible);
                    }}>
                      <View flexDirection='row'>
                        <Text style={{fontWeight:"bold", color:'rgb(50, 100, 1000)', fontSize:18, marginTop:-10}}> {"\n Shepherd dogs"} </Text>
                        
                        <Progress.Bar progress={0.8} color='rgb(13, 1, 117)' borderRadius={20} marginLeft={10} marginTop={10} width={140} height={30}>
                          <Text style={styles.modalProgressBarText}>31/{spoofGameFolders["Dogs"]["Shepherd dogs_ALL"].length} Species</Text>
                        </Progress.Bar>
                      </View>
            </TouchableOpacity> 

            <TouchableOpacity
                    style={styles.gameSelectionModal}
                    onPress={() => {
                      // setModalVisible(!modalVisible);
                    }}>
                      <View flexDirection='row'>
                        <Text style={{fontWeight:"bold", color:'rgb(50, 100, 1000)', fontSize:18, marginTop:-10}}> {"\n Pointers"} </Text>
                        
                        <Progress.Bar progress={0.8} color='rgb(13, 1, 117)' borderRadius={20} marginLeft={10} marginTop={10} width={140} height={30}>
                          <Text style={styles.modalProgressBarText}>31/{spoofGameFolders["Dogs"]["Hounds_ALL"].length} Species</Text>
                        </Progress.Bar>
                      </View>
            </TouchableOpacity> 

              {(auth.currentUser)?
              <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate(gameType, { 
                        name: gameName, 
                        folder: folderName,
                        hint: hintImages, 
                        level: userData[gameName]['gameSetLevel'], 
                        data: userData })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n CONTINUE GAME"} </Text>
                  </TouchableOpacity>  
:<View></View>}
                  <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      console.log(hintImages)
                      navigation.navigate(gameType, { 
                        name: gameName,
                        folder: folderName, 
                        hint: hintImages, 
                        level: 0, 
                        data: 0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n Image Recognition"} </Text>
                  </TouchableOpacity>  
            

                  <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setApplicationModalVisible(true);
                      // navigation.navigate('Application', { // The population average can be computed by cloud functions
                      //   name: gameName,
                      //   hint: hintImages, 
                      //   level: (auth.currentUser)?userData['Animal tracks']['gameSetLevel']:0, 
                      //   application: applicationImages,
                      //   applicationName: "Dog hunting situations",
                      //   data: (auth.currentUser)?userData:0 })
                    }}
                    >

                      <Text style={{fontWeight:"bold"}}> {"\n APPLICATIONS"} </Text>
                  </TouchableOpacity>              
                  
                  {/* <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Test', { // The population average can be computed by cloud functions
                        name: gameName,
                        folder: folderName,
                        hint: hintImages, 
                        level: (auth.currentUser)?userData[gameName]['gameSetLevel']:0, 
                        data: (auth.currentUser)?userData:0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n TEST YOUR KNOWLEDGE"} </Text>
                  </TouchableOpacity>   */}

                  {/* <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Comparison', { // The population average can be computed by cloud functions
                        name: gameName,
                        folder: folderName,
                        hint: hintImages, 
                        level: (auth.currentUser)?userData[gameName]['gameSetLevel']:0, 
                        data: (auth.currentUser)?userData:0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n COMPARISON??"} </Text>
                  </TouchableOpacity>   */}

                  <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);                      
                      let macroLevel = 0 
                      navigation.navigate(spoofMacroGameSets[gameName][macroLevel+ 1][1], { 
                        name: spoofMacroGameSets[gameName][macroLevel+ 1][0],
                        folder: spoofMacroGameSets[gameName][macroLevel+ 1][2],
                        macroName: gameName,
                        gameIsThreaded: 1,
                        macroLevel: 1,
                        application: applicationImages,
                        hint: hintImages, 
                        level: (auth.currentUser)?userData[gameName]['gameSetLevel']:0, 
                        data: (auth.currentUser)?userData:0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n THREAD"} </Text>
                  </TouchableOpacity>  


                  <TouchableOpacity
                    style={styles.gameSelectionModal}

                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Score', { // The population average can be computed by cloud functions
                        name: gameName,
                        folder: folderName,
                        hint: hintImages, 
                        level: (auth.currentUser)?userData[gameName]['gameSetLevel']:0, 
                        data: (auth.currentUser)?userData:0 })
                    }}>

                      <Text style={{fontWeight:"bold"}}> {"\n RANKING"} </Text>
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
              <Image source={{uri:`${outcomeImage[gameName]}`}} style={{height:200, width:360, marginLeft:-10, marginTop:50}}></Image>
            
            
              

            {/* </View> */}

          </View>
      </View>

      {/* </View>

     </SafeAreaView>  */}
      </Modal>


      {/* MODAL IF applicationModalVisible
              ALL GAME APPLICATIONS
      */}
      <Modal
      animationType="slide"
      transparent={true}
      // backgroundColor='rgba(22, 160, 133, 0.8)'
      visible={applicationModalVisible} //instead of on state change modalVisible
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      >

<View backgroundColor='rgba(46, 204, 113, 0.8)'>
       
            <View style={styles.modalRow}>

            <View flexDirection='column' marginBottom={3300}>
                  
                  <ApplicationsBlock/> 

                  <TouchableOpacity
                    style={styles.gameSelectionModal}
                    onPress={() => {
                      setApplicationModalVisible(!applicationModalVisible);
                    }}>
                      <Text style={{fontWeight:"bold"}}> {"\n BACK"} </Text>
                  </TouchableOpacity>  
            </View>
            
            
              <Image source={{uri:`${outcomeImage[gameName]}`}} style={{height:300, width:500, marginLeft:-10}}></Image>
            
          </View>
      </View>

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
    modalProgressBar: {
      color:'rgb(13, 1, 117)', borderRadius:20, marginLeft:10, marginTop:10, width:140, height:30
    },
    modalProgressBarText: {
      position:'absolute', flex:0, color:'rgb(255, 255, 255)', marginLeft:15, marginTop:5
    },
    toastPosition: {
      left: '0%',
      top: '-20%',

      backgroundColor:'rgba(255, 165, 0, 0.8)',
      flexWrap: "wrap"
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
      backgroundColor:'rgba(251, 192, 147, 0.8)',
      // justifyContent: 'space-evenly',
      borderRadius: 50,
      flexWrap: "wrap"
    },

    gameSelectionModal: {
      left: '0%',
      top: '20%',
      paddingBottom: 10,
      marginTop: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'space-around',
      width: 300,
      height: 50,
      backgroundColor:'rgba(251, 192, 147, 0.8)',
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
      top: '1%',
      left: '10%',
      width: (webView)?'80%':'80%',
      height: (webView)?'100%':'200%', 
      flexDirection : 'row', 
      justifyContent: (webView)?'space-evenly':'space-between',
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
      width:90,
      height: 90,
      marginLeft: 40,
      
    },
    button: {
      flex:(webView)?0:1,
      backgroundColor: '#0782F9',
      width: '100%',
      height: (webView)?'20%':'100%',
      padding: 15,
      borderRadius: 10,
      alignItems: (webView)?'center':'center',
  },
  buttonText: {
      color: 'white',
      fontWeight: '700', 
      fontSize: 16,
  },
    // END OF WEB VIEW.
  })