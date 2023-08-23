import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight, TextInput, StatusBar, Modal, Platform, Linking, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
// import { Image } from 'expo-image';
import { auth, storage, database } from '../firebase'
import { uid } from 'uid';
import { useNavigation } from '@react-navigation/core'
import { getDownloadURL, getMetadata, getStorage, list, listAll, ref, updateMetadata, uploadBytes,  } from 'firebase/storage'
import { ref as ref_d, set, get, onValue } from 'firebase/database'
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase/compat/app';
import ImageSlider from 'react-native-image-slider';
import { useToast } from 'react-native-fast-toast';
import Toast from 'react-native-fast-toast';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-web';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio } from "expo-av"
// import Toast, { useToast } from 'react-native-toast-notifications';
// import { Platform } from 'react-native/types';
// import Toast from 'react-native-fast-toast/lib/typescript/toast';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';

// https://www.wineware.co.uk/glassware/beginners-guide-to-different-types-of-wine-glasses

// Local Gamefile.
import { spoofGameSets, spoofOutcomeImages, spoofInstructions, spoofIncorrectTag, spoofCorrectTag, spoofMacroGameSets, spoofGameFolders} from '../gameFile';

const HomeScreen = (props) => {

  // Using gameFile downloaded upon Login.
  // const spoofGameFolders = props.route.params.gameFile.spoofGameFolders
  // const spoofGameAllocation = props.route.params.gameFile.spoofGameAllocation
  // const spoofGameHashtags = props.route.params.gameFile.spoofGameHashtags
  // const spoofGameMetrics = props.route.params.gameFile.spoofGameMetrics
  // const spoofGameSets = props.route.params.gameFile.spoofGameSets
  // const spoofInstructions = props.route.params.gameFile.spoofInstructions
  // const spoofIncorrectTag = props.route.params.gameFile.spoofIncorrectTag
  // const spoofCorrectTag = props.route.params.gameFile.spoofCorrectTag
  // const spoofMacroGameSets = props.route.params.gameFile.spoofMacroGameSets
  const [gameFile, setGameFile] = useState()

  useEffect(()=>{   
    if (props.route.params.gameFile){
      setGameFile(props.route.params.gameFile)
    } else {
      //GameFile loaded on Firebase Realtime Database.
      const gameFileRef = ref_d(database, "gameFile" );

      onValue(gameFileRef, (snapshot) => {
            const data = snapshot.val();
            if (data){
              console.log('Gamefile downloaded and set to state.')
              setGameFile(data)
            }            
          })

    }

      }, [])

  const selectedGame = props.route.params.name  
  const selectedFolder = props.route.params?.folder
  const userData = props.route.params?.data  
  const hint = props.route.params?.hint
  const applicationImages = props.route.params?.application
  const gameIsThreaded = props.route.params?.gameIsThreaded
  const macroName = props.route.params?.macroName

  const sound = new Audio.Sound()
  const macroLevel = props.route.params?.macroLevel 
  


  const [gameSetLevel, setGameSetLevel] = useState((auth.currentUser)?props.route.params?.level:1)
  const [learningLevel, setLearningLevel] = useState(1)
  
  // ONE-TIME UPDATE: Screen Title \\ LearningLevel based on entry in spoofMacroGameSets \\ Database Labelling
  useEffect(() => {
    navigation.setOptions({
      title: gameName+' Game',
    });
    console.log('hint is', hint)
    if (gameIsThreaded){
      setLearningLevel(spoofMacroGameSets[selectedFolder][macroName][macroLevel][3])
    }

    /* CAREFUL, VISIBLE PERFORMANCE LIMITATIONS. */
    // let fileName = "Dogs"
    // let subfolders =    spoofGameFolders[fileName]["Shepherd dogs_ALL"]   

    // for (let index=0; index<subfolders.length; index++){

    //   const A = ref(storage, fileName + "/"+ subfolders[index]+ "/");
    //   labelBatch(A, subfolders[index]);
    // }

  }, []);

  const toast = useRef(null);
  const [url, setUrl] = useState();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true)
  const [correctClickCount, setCorrectClickCount] = useState(0)
  const [incorrectClickCount, setIncorrectClickCount] = useState(0)
  
  const [successRate, setSuccessRate] = useState(1)
  const [modalVisible, setModalVisible] = useState(true)
  
  var gameName = spoofMacroGameSets[selectedFolder][macroName][gameSetLevel][0]//spoofGameSets[selectedGame][gameSetLevel]
  console.log(gameName, "is the game noww.")
  // const [gameName, setGameName ] = useState(spoofIncorrectTag[gameName][learningLevel]) // this is an issue upon first load.
  const [incorrectTag, setIncorrectTag ] = useState(spoofIncorrectTag[selectedGame][learningLevel]) // this is an issue upon first load.
  const [instructionText, setInstructionText] = useState(spoofInstructions[selectedGame][learningLevel])
  const [correctTag, setCorrectTag] = useState(spoofCorrectTag[selectedGame][learningLevel])
  const [sort, setSort] = useState(false)
  
  // const [outcomeImage, setOutcomeImage] = useState(spoofOutcomeImages[gameName][learningLevel])
  const [progressInGame, setProgressInGame] = useState(learningLevel/(Object.keys(spoofInstructions[selectedGame]).pop()))
  const [gameComplete, setGameComplete] = useState(false)
  const [gameSetComplete, setGameSetComplete] = useState(false)
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'
  const [showHint, setShowHint] = useState(false)
  
  // Locking in Landscape Mode.
  if (!webView){
    ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
  } 
  
  // learningLevel update from progressCalculate
  useEffect(() => {
    // Reset gallery no matter if game still going / has ended.
    setGallery([]) 
    setGalleryTags({})
    // at end of mini game, update text / Next Game button
    if (learningLevel == Object.keys(spoofInstructions[selectedGame]).length) {
      
      setGameComplete(true)
      let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))
      setInstructionText(spoofInstructions[selectedGame][learningLevel] + ' Rating: '+ (100*averageCorrectRate).toFixed(0) + '%'); //TBD. Database.

      // gameSetComplete when gameSetLevel of MacroGameSets reaches full length.
      if (gameSetLevel+1 == spoofMacroGameSets[selectedFolder][macroName].length){
        setGameSetComplete(true)
      }
      if (auth.currentUser){
        // Update Latest Level (is reset for every level)
        set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedFolder+'/'+macroName+'/latestLevel/'), {
          gameSetLevel: gameSetLevel,
          folder: selectedFolder,
          gameName: spoofGameFolders[selectedFolder][selectedGame][0],
          levelGrouping: gameName,
          macroName: macroName,
        }).catch(error =>alert(error.message)); 

      }

      return
    }

    // within mini game, update text / tags / hint
    setInstructionText(spoofInstructions[selectedGame][learningLevel]); //Triggers toastmessage (Hook)
    setCorrectTag(spoofCorrectTag[selectedGame][learningLevel]) 
    setIncorrectTag(spoofIncorrectTag[selectedGame][learningLevel]) //Triggers DB Download (Hook)
    setShowHint(false)
  
    // within mini game, update progress bar
    setProgressInGame ( learningLevel/(Object.keys(spoofInstructions[selectedGame]).pop()) )
    
  }, [learningLevel, gameSetLevel])

  // updating instructions brings up a toastmessage
  useEffect(() => {
    toast.current.show(instructionText, { type: "success" });
  }, [instructionText])

  // Download when finished updated incorrectTag (via learningLevel change)
  useEffect(()=> {

    // LOCATIONS REFERENCES: Download locations using the tags from Gamefile
    const correctListRef = ref(storage, selectedFolder + '/'+correctTag+'/');
    console.log(incorrectTag)
    const incorrectListRef = ref(storage, selectedFolder + '/'+incorrectTag[0]+'/');
    
    if (incorrectTag.length>1){
      var incorrectListRef2 = ref(storage, selectedFolder + '/'+incorrectTag[1]+'/');
      var incorrectListRef3 = ref(storage, selectedFolder + '/'+incorrectTag[2]+'/');
    }
   
    // Empty the gallery in preparation for Download
    setGallery(old => [])

    // Download from DB storage to gallery
    getImagesFromRef(incorrectListRef, incorrectTag[0], 4).then(()=>{
      getImagesFromRef(correctListRef, correctTag, 4)?.then(()=> {
          getImagesFromRef(incorrectListRef2, incorrectTag[1], 4)?.then(()=> {
            if (incorrectListRef3){
              getImagesFromRef(incorrectListRef3, incorrectTag[2], 4)
            }  
        })
      })
    })     

  }, [incorrectTag]) //TEST


  const getAudioLoaded = async() => {
    // await sound.setPositionAsync(0);
    await sound.loadAsync(
      require('../assets/test_audio/boxer.mp3'),
      { progressUpdateIntervalMillis: 200 }
    ).then(async()=> {
      console.log('sound is loaded.')
      await sound.playAsync().then(()=>console.log('sound has been played.'))
    })
  }
  
  const getImagesFromRef = async(ref, tag, upperLimit=5) => {
    if (ref==undefined){
      console.log('skipping ref because storage is undefined:', ref)
      return
    }

    await list(ref)
    .then((res) => { 
      // Start index of download can choose in a safe range "window"
      let window = (((res.items).length) > upperLimit)? ((res.items).length-upperLimit-1) : 0; 
      // Start index chosen as random int in range (0, safe length)
      const randomDatabaseImageIndex = Math.floor(Math.random() * (window));
      // Download list length constrained to upperLimit or smaller if less at location
      upperLimit = (window==0)?((res.items).length):upperLimit;
      // Start download
      let galleryVal = []
      // setSort(true)
      res.items.slice(randomDatabaseImageIndex, randomDatabaseImageIndex+upperLimit).forEach((itemRef) => {
      

                        getDownloadURL(itemRef).then((y)=> {
                        
                          getMetadata(itemRef)
                            .then((metadata) => {
                              
                              /* (1) Ordering urls by Tag */
                              setGalleryTags(old => {
                                let tagDict = {...old}
                                // if tag is in tagDict: add url. Else: create key-value pair.
                                if (Object.keys(tagDict).includes(metadata.customMetadata['tag'])){ 
                                  old[metadata.customMetadata['tag']].push(y)
                                  // if galleryTags urls reach the upperLimit argument: push them to gallery
                                  if (old[metadata.customMetadata['tag']].length == upperLimit){

                                    
                                    /* (2) Displaying urls on Page */
                                    
                                    setSortingGallery(gallery => {
                                      // gallery urls taken from galleryTags[tag] of length upperLimit
                                      galleryVal = [...gallery, ...old[metadata.customMetadata['tag']]] 
                                      console.log('val length:'+galleryVal.length)
                                      // sorting Gallery: if 12 urls reached, shuffle until only 2 correct in the visible portion.

                                      if (galleryVal.length==12){
                                        do {
                                          console.log('Shuffling -')
                                          galleryVal.sort( () => .3 - Math.random() );
                                          visibleGallery = galleryVal.slice(2, 10)

                                          correctLeftInGallery = tagDict[correctTag].filter((url) => visibleGallery.includes(url) )
                                          
                                        } while (correctLeftInGallery.length != 2)
                                        // validation
                                        // console.log('correctLeftInGallery: '+correctLeftInGallery.length)

                                        // Render late to prevent visible reshuffling.
                                        setGallery([...visibleGallery])
                                        setSortingGallery([])
                                      }
                                      
                                      
                                      return galleryVal
                                    });
                                  };                                   
                                } else {
                                  tagDict[metadata.customMetadata['tag']]=[y]
                                }
                                return tagDict
                                
                              });

                              
                              

                            }).catch((error) => { // metadata error
                              console.log(error)
                            });

                        }).catch((error) => { // download error
                          console.log('Error in CatList.')
                          console.log(error)
                        });
                    }) 
      }) 
      
  }


  const labelBatch = async(ref, tag) => {
    // TBD | according to gameName
    await list(ref)
    .then((res) => {
      
      // .
      // sliced to 10 correct tags
      res.items.forEach((itemRef) => {
      

                        getDownloadURL(itemRef).then((y)=> {

                          // This was a workaround... but it labelled everything at once. 
                          // (/!\ DO NOT SPLIT FOR-EACH)
                          const metadata = {
                                contentType: 'image/jpeg',
                                customMetadata: {
                                  'tag': tag
                                }
                              };
                          updateMetadata(itemRef, metadata)
                          .then((metadata) => {

                          }).catch((error) => {
                            console.log(error)
                            // Uh-oh, an error occurred!
                          });
  
                      }).catch((error) => {
                        console.log('Error in CatList.')
                        console.log(error)
                      })     
        })
      })

  };

  // setGallery(images)
  const storage = getStorage();
  const [onlineGallery, setOnlineGallery] = useState([]) 
  //sorted before render 
  const [sortingGallery, setSortingGallery] = useState([]) 
  const [gallery, setGallery] = useState([null])
  const [galleryTags, setGalleryTags] = useState({'Test': 'test'})
  console.log('LENGTH: ', onlineGallery.length)

  const pushImage = (y) => {
    if (onlineGallery) {
      setOnlineGallery(current => [...current, y])
    } else {
      setOnlineGallery([y])
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality:1,
    });

    const source = {uri: result.assets[0].uri}
    console.log(source);
    setImage(source);
  }

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri)
    
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+4);
    // var name=prompt("Please enter your name","Harry Potter");
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        'tag': customMetadataInput
      }
    };
    
    console.log('image name is: ', filename)

    const in_images = gameName+'/'+correctTag+'/'+filename
    const storageRef = ref(storage, in_images)

    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      getDownloadURL(storageRef)
      .then((url) => {
        // console.log('database: ', database)
        const uuid = uid()
        set(ref_d(database, `${uuid}`), {
          profile_picture: url
        }).catch(error =>alert(error.message));
      }).catch(error =>alert(error.message));

      const starCountRef = ref_d(database, 'profile-urls/' + 'user1' + '/profile_picture');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log('profile pic now is:', data)
      })

    })

    setUploading(false);
    setImage(null);
  }

  // FUNCTION: Picture disappears if it has the correct tag.

  const handlePicSelection = async( picNb ) => {

    // BREAK OUT: if game is marked completed.
    if (gameComplete||gameSetComplete){
      toast.current.show("Game Complete!", { type: "error" });
      return
    }

    setLoading(false)
    console.log('TAGS\n', galleryTags, picNb-1)

    // TRUE CASE: Correct Picture selected.       

    if (galleryTags[correctTag]?.includes(gallery[picNb-1])) { 
    // Remove the Clicked Picture 
      setGallery(prevState => {
          
          let newState = [...prevState]
          newState.splice(picNb-1, 1);                   
          return newState})

      setCorrectClickCount(prevClicks=> prevClicks+1)



    } else {

      // FALSE CASE: Incorrect Picture selected.  
      setGallery(prevState => {
        return prevState})

      setIncorrectClickCount(prevState=> prevState+1)

      for (let i=0; i<incorrectTag.length; i++){
        if (galleryTags[incorrectTag[i]]?.includes(gallery[picNb-1])){
          let feedbackTag = incorrectTag[i]
          toast.current.show("Correction: "+feedbackTag+".", { type: "error" });
        }
      }
      
    }

  }

  const findLabelOfPic = (picNb) => {
    if (galleryTags[correctTag]?.includes(gallery[picNb-1])){
      return correctTag
    } else {

      for (let i=0; i<incorrectTag.length; i++){
        if (galleryTags[incorrectTag[i]]?.includes(gallery[picNb-1])){
          let feedbackTag = incorrectTag[i]
          return feedbackTag
        }
      }      

    }


  }

  const handleSignOut = () => {
    auth
        .signOut()
        .then(()=> {
            navigation.replace("Login")
        }).catch(error =>alert(error.message))
  }

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const _onMomentumScrollEnd = (e, state, context) => {
    console.log(state, context)
  };
  const [customMetadataInput, onChangeCustomMetadataInput] = useState('nut/almond');
  

  const handleSelectionScreen = () => {
    navigation.replace("Selection", { 
      gameFile: gameFile,
    })
  }

  // progress bar - within the level we are at.
  const progressCalculate = () => {
    console.log('is Loaded before progress calculation? ', !loading)
    //(make sure loaded)
    if (loading){
      return progressInGame
    } else {
    let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))
    var index = 0
    var visibleGallery = gallery.slice(0,5)
    var correctLeftInGallery = galleryTags[correctTag].filter((url) => visibleGallery.includes(url) )
    // || ((correctLeftInGallery.length == 0 ) && !loading)
    // if ((averageCorrectRate > 0.8) ){T
    // var  correctLeftInGallery = 2
    console.log('level if 0: ', correctLeftInGallery.length)

    
    // END OF GAME When no more left in gallery.
    if (correctLeftInGallery.length == 0){
      setLoading(true)
      const currentDate = new Date();
      const timestamp = currentDate.getTime(); 
      // Update correctTag Accuracy (set by timestamp to prevent resetting)
      if (auth.currentUser) {
        set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedFolder+'/tags/'+correctTag + '/'+timestamp), {
          correct: averageCorrectRate,
          time: currentDate.getDate()+'/'+(currentDate.getMonth()+1)+'@'+currentDate.getHours()+':'+currentDate.getMinutes()
        }).catch(error =>alert(error.message));           
      }



      // TECHNICALLY A REPEAT HERE.
      if (gameComplete && (gameSetLevel >= Object.keys(spoofMacroGameSets[selectedFolder][macroName]).length)){
        setGameSetComplete(true)
        // #RECORD_ACCURACY
      } else {
        // Learning Level Hook changes the gallery + instructions
        setLearningLevel(prev => prev+1) 
      }
      
      
      
    }
    
    
    return progressInGame
  }
  }

  const nextGameSetLevel = () => {
    // Within Macro Game Set: record latestLevel & accuracy
    if (gameSetLevel-1 < Object.keys(spoofMacroGameSets[selectedFolder][macroName]).length) {
      
      if (auth.currentUser) {
          let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))
          setSuccessRate(prev => (prev+averageCorrectRate)/2) // will be reset once per game.
          const currentDate = new Date();
          const timestamp = currentDate.getTime(); 

          // // Update Latest Level (is reset for every level)
          // set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedFolder+'/'+macroName+'/latestLevel/'), {
          //   gameSetLevel: gameSetLevel,
          //   folder: selectedFolder,
          //   gameName: spoofGameFolders[selectedFolder][selectedGame][0],
          //   levelGrouping: gameName,
          //   macroName: macroName,
          // }).catch(error =>alert(error.message));       

          // Update Level Accuracy (set by timestamp to prevent resetting)
          set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedFolder+'/'+macroName+'/accuracy/'+(gameSetLevel) + '/'+timestamp), {
            correct: averageCorrectRate,
            time: currentDate.getDate()+'/'+(currentDate.getMonth()+1)+'@'+currentDate.getHours()+':'+currentDate.getMinutes()
          }).catch(error =>alert(error.message));    
        }
      
      console.log('successRate: ', successRate)
      console.log('Level Up.')
      // Resetting In-Game state
      setCorrectClickCount(0)  
      setIncorrectClickCount(0)
      setLearningLevel(1)
      // Next level in Macro - game is complete.
      setGameSetLevel(previous => previous+1)
      setGameComplete(false)
      // Optional Modal Window
      setModalVisible(true)
      return
    } else {
      // setGameSetComplete(true)
      console.log('TRUE: Game Set Complete.')
    }


  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    

    <View>
      <Toast ref={toast}  style={styles.toastPosition}/>
      <View style={{padding: 15}}></View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
        <TouchableOpacity  onPress={handleSelectionScreen}>
          <Text style={{...styles.buttonText, color:'black'}}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 13, alignContent: 'flex-end', marginLeft: 20}} > 
        {macroName.toUpperCase()} Game </Text>

          
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
      
      {/* <Text style={{fontSize: 20, color:'black'}}> {instructionText} </Text> */}

      {/* IMAGE ONLY IN HOME SCREEN */}
      {/* <Image 

          source={{uri:`${galleryTags[correctTag]}`,}}
          style={{...styles.imageContainer, height:100, width: 100}}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        /> */}
        </View>
      
      <View style={{padding: 3}}></View>
      <View style={{flexDirection: 'row'}} >
      <View style={{ flex: 1, width: 20, height: 150*3, backgroundColor: 'rgb(13, 1, 117)' }}/>
      <View style={{flexDirection: 'column', width:115, marginTop:10}}>
      <Text style={{fontSize: 20, color:'black'}}> {instructionText} </Text>
      <View   style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>



{/* NEXT LEVEL (when GameComplete) / Progress BAR (when not) */}

{(gameComplete&&(!gameSetComplete))? 
/*A - if between games*/
<TouchableOpacity  padding={50}  style={styles.button} onPress={nextGameSetLevel} >
      <Text style={styles.buttonText}>Next Level</Text>
</TouchableOpacity>


:(gameSetComplete)? 
/*B - if at end of game set*/
<TouchableOpacity  padding={50}  style={styles.buttonRainbox} onPress={()=>{

    // Key information upon ending a set.
    setSuccessRate(correctClickCount/(correctClickCount+incorrectClickCount))
    let date_finished = new Date();
    const finishTimestamp = date_finished.getTime(); 

    // MacroGames ('threaded') lead on to the next, else replace with Final Score.
    if (gameIsThreaded ==1) {

      navigation.replace(spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][1], { 
        gameFile: gameFile,
        name: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][0],
        folder: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][2],
        macroLevel: macroLevel + 1,
        macroName: macroName,
        hint: hint, 
        gameIsThreaded: 1,
        application: applicationImages,
        level: gameSetLevel+1, //gameName?
        data: (auth.currentUser)?userData:0 })
    } else {

      navigation.replace('Score', { 
        gameFile: gameFile,
        name: selectedGame,
        lastscore: successRate, 
        lastdate: finishTimestamp,
        data:  (auth.currentUser)?userData:0 })          
    }
}}>
    <Text style={styles.buttonText}>Finish</Text></TouchableOpacity>

: /*C - else if game is not complete*/
<Progress.Bar progress={progressCalculate()} color={'rgb(13, 1, 117)'}  borderRadius={20} marginTop={20} width={110} height={30}/>
}


<TouchableOpacity  padding={50}  style={{...styles.button, width:100}} onPress={()=>setShowHint(!showHint)} >
    {// HINT SHOWN
    showHint?<Image 
      source={{uri:`${galleryTags[correctTag]}`,}}
      style={{...styles.imageContainer, height:100, width: 100}}
      placeholder={blurhash}
      contentFit="cover"
      transition={1000}
      />:<Text style={styles.buttonText}>Hint</Text>}
</TouchableOpacity>



</View>
       </View> 

       <View style={{ flex: 1, width: 20, height: 150*3, backgroundColor: 'rgb(13, 1, 117)' }}></View>
      <View style={{flexDirection: 'column'}}>
        <TouchableHighlight onPress={()=> handlePicSelection(1)}>
          <Image 

            source={{uri:`${gallery[0]}`,}}
            style={styles.imageContainer}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> handlePicSelection(4)}>
        <Image 
          source={{uri:`${gallery[3]}`,}}
          style={styles.imageContainer}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        </TouchableHighlight>    

      </View>

      
      <View style={{flexDirection: 'column'}}>


        <TouchableHighlight onPress={()=> handlePicSelection(2)}>
        <Image 
          source={{uri:`${gallery[1]}`,}}
          style={styles.imageContainer}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> handlePicSelection(5)}>
          <Image 
            source={{uri:`${gallery[4]}`,}}
            style={styles.imageContainer}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />        
        </TouchableHighlight>
        
      </View>

      <View style={{flexDirection: 'column'}}>


        <TouchableHighlight onPress={()=> handlePicSelection(3)}>
        <Image 
          source={{uri:`${gallery[2]}`,}}
          style={styles.imageContainer}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> handlePicSelection(6)}>
          <Image 
            source={{uri:`${gallery[5]}`,}}
            style={styles.imageContainer}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />        
        </TouchableHighlight>
      </View>
      <View style={{ flex: 1, width: 20, height: 150*3, backgroundColor: 'rgb(13, 1, 117)' }}/></View>
    <View style={styles.container}>

      
      {/* KEEP THIS STUFF
      
      <Text>Email: {auth.currentUser?.email}</Text> */}
      
      {/* <TextInput
      onChangeText={onChangeCustomMetadataInput}
      value={customMetadataInput}
      style={styles.input}>
      </TextInput>  */}

      

     {/* <TouchableOpacity style={styles.button} onPress={pickImage} >
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>

      

      <TouchableOpacity style={styles.button} onPress={uploadImage} >
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity> */}



      {/* <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity> */}

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

      <View  style={{backgroundColor:colors.background}}> 
          {/* {(hint[(gameSetLevel+1).toString()])?
           <Image source={{uri: `${hint[(gameSetLevel+1).toString()]}`}} style={{height:(webView)?600:200, width:(webView)?1000:330, marginLeft:(webView)?300:15, marginBottom:-150}}></Image>
            : 
            <View></View>
        } */}
        <View style={{flexDirection: 'row'}} >
        <View style={{flexDirection: 'column'}}>
                <TouchableOpacity >
                  <Image 

                    source={{uri:`${galleryTags[spoofGameFolders[selectedFolder][selectedGame][3]]}`,}}
                    style={styles.imageContainer}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][3]}</Text>
                  </View>
                </TouchableOpacity>
                <Progress.Bar progress= {0.2} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text >{0.2*100+'%'}</Text>
                  </View>
                {/* <TouchableOpacity >
                <Image 
                  source={{uri:`${galleryTags[incorrectTag[2]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{findLabelOfPic(4)}</Text>
                  </View>
                </TouchableOpacity>     */}

              </View>

              
              <View style={{flexDirection: 'column'}}>


                <TouchableOpacity onPress={()=>console.log(galleryTags[incorrectTag[0]][0])}>
                <Image 
                  source={{uri:`${galleryTags[spoofGameFolders[selectedFolder][selectedGame][2]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][2]}</Text>
                  </View>
                </TouchableOpacity>
                <Progress.Bar progress= {0.2} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text >{0.2*100+'%'}</Text>
                  </View>
                {/* <TouchableOpacity >
                  <Image 
                    source={{uri:`${galleryTags[incorrectTag[1]]}`,}}
                    style={styles.imageContainer}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />    
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{findLabelOfPic(5)}</Text>
                  </View>    
                </TouchableOpacity> */}
                
              </View>

              <View style={{flexDirection: 'column'}}>


                <TouchableOpacity >
                <Image 
                  source={{uri:`${galleryTags[spoofGameFolders[selectedFolder][selectedGame][1]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][1]}</Text>
                  </View>
                </TouchableOpacity>
                <Progress.Bar progress= {0.2} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text >{0.2*100+'%'}</Text>
                  </View>                
                {/* <TouchableOpacity >
                  <Image 
                    source={{uri:`${galleryTags[incorrectTag[0]]}`,}}
                    style={styles.imageContainer}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{findLabelOfPic(6)}</Text>
                  </View>        
                </TouchableOpacity> */}
              </View>

              <View style={{flexDirection: 'column'}}>


              <TouchableOpacity >
                <Image 
                  source={{uri:`${galleryTags[spoofGameFolders[selectedFolder][selectedGame][0]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][0]}</Text>
                  </View>
                </TouchableOpacity>

                  <Progress.Bar progress= {0.2} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                  <View style={styles.percentLabel}>
                      <Text >{'No score'}</Text>
                    </View>         


                {/* <TouchableOpacity >
                  <Image 
                    source={{uri:`${galleryTags[correctTag]}`,}}
                    style={styles.imageContainer}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                <View style={styles.cardLabel}>
                  <Text style={{backgroundColor:colors.cardTag}}>{findLabelOfPic(6)}</Text>
                </View>        
              </TouchableOpacity> */}
              </View>

              {/* <View style={{flexDirection: 'column'}}> */}

            <View style={styles.modalRow}>
                    <TouchableOpacity
                  style={{...styles.gameSelection}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    // console.log(hint)
                  }}>
                    <Text style={{fontWeight:"bold"}}> {"\n START"} </Text>
                </TouchableOpacity> 

                <TouchableOpacity
                  style={{...styles.gameSelection}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.replace(spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][1], { 
                      gameFile: gameFile,
                      name: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][0],
                      folder: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][2],
                      macroLevel: macroLevel + 1,
                      macroName: macroName,
                      hint: hint, 
                      gameIsThreaded: 1,
                      application: applicationImages,
                      level: gameSetLevel, //gameName?
                      data: (auth.currentUser)?userData:0 })
                  }}>
                    <Text style={{fontWeight:"bold"}}> {"\n SKIP LEVEL"} </Text>
                </TouchableOpacity>   
              {/* <TouchableOpacity
                style={{...styles.gameSelection, marginBottom:10}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // console.log(hint)
                }}>
                  <Text style={{fontWeight:"bold"}}> {"\n OK"} </Text>
              </TouchableOpacity>   */}

              
            </View>


              {/* </View> */}

      
        </View>



      </View>
      </Modal>
    </View>
  )

}

export default HomeScreen

const colors = {
  background: 'rgba(102, 0, 102, 0.8)',
  cardTag: '	rgb(128,128,128)',
  modalButtonText: 'rgb(50, 200, 1000)',
  bars: {
    1: '#15AD13',
    2: '#223D63',
    3: '#0066CC',
    4: '#9933FF',
    5: '#0066CC',
    6: '#FF3333',
    7: '#006633',
  }
}

const styles = StyleSheet.create({


      cardLabel: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-end', 
      },
      percentLabel: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 5, justifyContent: 'flex-end', alignItems: 'center', 
      },
      toastPosition: {
        left: '-10%',
        top: '-80%',

        backgroundColor:'rgba(255, 165, 0, 0.8)',
        flexWrap: "wrap"
      },

      text1: {
        fontSize: 34
      },
      text2: {
        fontSize: 22,
        margin: 5
      },
      text3: {
        fontSize: 18
      },
      progressBar: {
      width: '100%',
      height: 20,
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      // backgroundColor: '#fff',
      // borderWidth: 3,
      // borderRadius: 8,
      // // borderColor: '#555',
      // flexDirection:"row"
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    flexContainer: {
      flex: 1,
      padding: 20,
    },
    container: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    imageContainer: {
        // flex:1,
        // backgroundColor: '#123456',
        // justifyContent: 'center',
        // alignItems: 'center',
        width:100,
        height:140,
        borderRadius:20,
        
        // resizeMode: 'contain',
    },
    imageContainerGreyed: {

      width:150,
      height:150,
      borderRadius:20,
      opacity: 0.3
  },
    buttonsSlider: {
      height: 15,
      marginTop: -25,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonSlider: {
      margin: 3,
      width: 8,
      height: 8,
      borderRadius: 8 / 2,
      backgroundColor: '#ccc',
      opacity: 0.9,
    },
    buttonSelected: {
      opacity: 1,
      backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'rgb(13, 1, 117)',
        width: '40%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonRainbox: {
      backgroundColor: '#e66465',
      width: '40%',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
  },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
      },
      uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      },
      // imageContainer: {
      //   marginTop: 30,
      //   marginBottom: 50,
      //   alignItems: 'center'
      // },
      progressBarContainer: {
        marginTop: 20
      },
      imageBox: {
        width: 300,
        height: 300
      },

    // externalMedia: {
    //     backgroundColor: 'green',
    //     width: '20%',
    //     padding: 15,
    //     borderRadius: 40,
    //     alignItems: 'right',
    //     marginTop: 40,
    // },


    buttonText: {
        color: 'white',
        fontWeight: '700', 
        fontSize: 16,
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
    gameSelection: {

      // fontWeight: "bold",
      // left: '4%',
      // top: '57%',
      justifyContent: "flex-start",
      alignItems: 'center',
      width: 150,
      height: 50,
      // marginTop:30,
      // marginLeft:20,
      backgroundColor:'rgba(102, 140, 190, 1)',
      borderRadius: 50
    },

    modalRow: {
      // top: '-60%',
      // width: '600%',
      // height: '100%', 
      flexDirection : 'column', 
      justifyContent: 'space-evenly',
    },
})


      