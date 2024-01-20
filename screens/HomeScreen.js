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
import { useNetInfo } from '@react-native-community/netinfo';
// import Toast, { useToast } from 'react-native-toast-notifications';
// import { Platform } from 'react-native/types';
// import Toast from 'react-native-fast-toast/lib/typescript/toast';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';

// https://www.wineware.co.uk/glassware/beginners-guide-to-different-types-of-wine-glasses

// Local Gamefile.
// import { spoofGameSets, spoofOutcomeImages, spoofInstructions, spoofIncorrectTag, spoofCorrectTag, spoofMacroGameSets, spoofGameFolders} from '../gameFile';


const HomeScreen = (props) => {

  // Using gameFile downloaded upon Login.
  
  const spoofGameFolders = props.route.params.gameFileContext.spoofGameFolders
  const spoofGameAllocation = props.route.params.gameFileContext.spoofGameAllocation
  const spoofGameHashtags = props.route.params.gameFileContext.spoofGameHashtags
  const spoofGameMetrics = props.route.params.gameFileContext.spoofGameMetrics
  const spoofGameSets = props.route.params.gameFileContext.spoofGameSets
  const spoofInstructions = props.route.params.gameFileContext.spoofInstructions
  const spoofIncorrectTag = props.route.params.gameFileContext.spoofIncorrectTag
  const spoofCorrectTag = props.route.params.gameFileContext.spoofCorrectTag
  const spoofMacroGameSets = props.route.params.gameFileContext.spoofMacroGameSets
  const spoofReleaseStatus = props.route.params?.gameFileContext?.spoofReleaseStatus
  const savedMacroTags = props.route.params?.galleryTags
  // console.log('savedMacroTags: ', savedMacroTags)
  const [gameFile, setGameFile] = useState()
  const [gameDownloaded, setGameDownloaded] = useState()
  const [tagDictionary, setTagDictionary] = useState()
  const [selectedGame, setSelectedGame] = useState(props.route.params.name)
  // const selectedGame =  
  console.log('selected Game is', selectedGame)
  const selectedFolder = props.route.params?.folder
  console.log('selected Folder is', selectedFolder)
  useEffect(()=>{   



    // First if-else attributes the gameFile.

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

      // }, [])

      // useEffect(()=>{

        // Second if-else attributes game tags:

        if (props.route.params.gameDownloaded){ //if exists and true.
          // Get allTags from passed parameter.
          
          // setGalleryTags(savedMacroTags)
          console.log("--> Images already Downloaded. Starting the Shuffle.")
          console.log(savedMacroTags)
          doShuffleAndLay(savedMacroTags)
          setTagDictionary(savedMacroTags)
          setGalleryTags(savedMacroTags)

        } else {
          //GetImagesRecursively from Firebase Realtime Database.
          macroTags = spoofGameFolders[selectedFolder][macroName+'_ALL'] // All macro tags
          console.log('--> Downloading images for: ', macroName+'_ALL')
          getImagesRecursively(macroTags) //gameDownloaded set at end
        }

        // if (gameDownloaded){ //galleryVal.length>8 && 
        //   doShuffleAndLay()
        // }
    }, []) 

    useEffect(()=>{


      if (gameDownloaded){ //galleryVal.length>8 && 
        // doShuffleAndLay()
      }
  }, [gameDownloaded]) 

  const doShuffleAndLay = async(allGalleryTags) => {
    // setGalleryTags(allGalleryTags)
    // console.log('taglist is: ', tagList, '\n and ')
    // console.log(allGalleryTags)
    let tagUrls = []
    
    for (let tag_i=0; tag_i<tagList.length ; tag_i++) {
      console.log('tag is', tagList[tag_i])
      // console.log('entry is', allGalleryTags)
      if (tagUrls.length == 0){
        tagUrls = [...allGalleryTags[tagList[tag_i]]]
      } else {
        tagUrls = [...tagUrls, ...allGalleryTags[tagList[tag_i]]]
      }
      
    }
    // .then(()=>{

    // })

    do {
      console.log('Shuffling -')

      
      
      tagUrls.sort( () => .3 - Math.random() );
      
      visibleGallery = tagUrls.slice(2, 10)
      tagDict = {...allGalleryTags}
      correctLeftInGallery = tagDict[correctTag].filter((url) => visibleGallery.includes(url) )
      
    } while (correctLeftInGallery.length != 2)
    // validation
    // console.log('correctLeftInGallery: '+correctLeftInGallery.length)

    // Render late to prevent visible reshuffling.
    setGallery([...visibleGallery])
    console.log(visibleGallery)
    // setSortingGallery([])
  }
    
  const userData = props.route.params?.data  
  const hint = props.route.params?.hint
  const applicationImages = props.route.params?.application
  const gameIsThreaded = props.route.params?.gameIsThreaded
  const macroName = props.route.params?.macroName

  const sound = new Audio.Sound()
  var macroLevel = props.route.params?.macroLevel 
  


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
  const netInfo = useNetInfo();
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
  // setSelectedGame(spoofMacroGameSets[selectedFolder][macroName][gameSetLevel][0])
  var gameName = spoofMacroGameSets[selectedFolder][macroName][gameSetLevel][0]//spoofGameSets[selectedGame][gameSetLevel]
  console.log(macroName, "is the game noww. Selected Game is", selectedGame, "and gameName is", gameName)
  // const [gameName, setGameName ] = useState(spoofIncorrectTag[gameName][learningLevel]) // this is an issue upon first load.
  const [incorrectTag, setIncorrectTag ] = useState(spoofIncorrectTag[selectedGame][learningLevel]) // this is an issue upon first load.
  const [instructionText, setInstructionText] = useState(spoofInstructions[selectedGame][learningLevel])
  const [correctTag, setCorrectTag] = useState(spoofCorrectTag[selectedGame][learningLevel])
  const [tagList, setTagList] = useState(spoofGameFolders[selectedFolder][selectedGame])
  const [sort, setSort] = useState(false)
  
  // const [outcomeImage, setOutcomeImage] = useState(spoofOutcomeImages[gameName][learningLevel])
  const [progressInGame, setProgressInGame] = useState(learningLevel/(Object.keys(spoofInstructions[selectedGame]).pop()))
  const [gameComplete, setGameComplete] = useState(false)
  const [gameSetComplete, setGameSetComplete] = useState(false)
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'
  const [showHint, setShowHint] = useState(false)
  const [galleryTags, setGalleryTags] = useState({})
  // Locking in Landscape Mode.
  if (!webView){
    ScreenOrientation.lockAsync(6); //LANDSCAPE_LEFT
  } 
  
  // learningLevel update from progressCalculate
  useEffect(() => {
    // Reset gallery no matter if game still going / has ended.
    setGallery([]) 
    // setGalleryTags({}) // Keeping saved.
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
        // Update Latest Level (is reset for every level) //auth.currentUser.email.split('.')[0]
        set(ref_d(database, `userdata/${auth.currentUser.uid}/`+selectedFolder+'/'+macroName+'/latestLevel/'), {
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
    setIncorrectTag(spoofIncorrectTag[selectedGame][learningLevel]) //Triggers DB Download + myTags (Hook)
    setShowHint(false)
    setGallery(old => [])
    console.log('tagDictionary: \n', tagDictionary)
    doShuffleAndLay(tagDictionary)
    // if (gameDownloaded) {
    //   doShuffleAndLay()
    // }
    
    // setGameDownloaded(old => old+1) // Triggers shuffle (Hook)
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

    // Empty the gallery in preparation for Download
    const myTags = spoofGameFolders[selectedFolder][selectedGame]
    allTags = spoofGameFolders[selectedFolder][selectedGame] //4 tags
    console.log("allTags is ", allTags)
    // allTags = spoofGameFolders[selectedFolder][selectedGame] //all macro tags
    setTagList(myTags)
    // next_ref = ref(storage, selectedFolder + '/'+correctTag+'/');
    // allTags.filter(tag => tag !== correctTag);
    // getImagesFromRef(next_ref, correctTag, 4)
    
    // for (let i_ref=0; i_ref<allTags.length; i_ref++){
    //   nextTag = allTags[i_ref]
    //   next_ref = ref(storage, selectedFolder + '/'+nextTag+'/');
    //   getImagesFromRef(next_ref, allTags, 4)
    // }

    
  
    // const correctListRef = ref(storage, selectedFolder + '/'+correctTag+'/');
    // console.log(incorrectTag)
    // const incorrectListRef = ref(storage, selectedFolder + '/'+incorrectTag[0]+'/');
    
    // if (incorrectTag.length>1){
    //   var incorrectListRef2 = ref(storage, selectedFolder + '/'+incorrectTag[1]+'/');
    //   var incorrectListRef3 = ref(storage, selectedFolder + '/'+incorrectTag[2]+'/');
    // }

    // Download from DB storage to gallery
    // getImagesFromRef(incorrectListRef, incorrectTag[0], 4).then(()=>{
    //   getImagesFromRef(correctListRef, correctTag, 4)?.then(()=> {
    //       getImagesFromRef(incorrectListRef2, incorrectTag[1], 4)?.then(()=> {
    //         if (incorrectListRef3){
    //           getImagesFromRef(incorrectListRef3, incorrectTag[2], 4)
    //         }  
    //     })
    //   })
    // })     

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
  const getImagesRecursively = (allTags) => {
      // console.log("CURRENT TAGS:", allTags)
      nextTag = allTags[0]
      console.log('--> Calling tag: ', nextTag, 'inside selectedFolder:', selectedFolder)
      next_ref = ref(storage, selectedFolder + '/'+nextTag+'/');
      let shiftedAllTags= allTags.filter((tag => tag!==nextTag))
      
      getImagesFromRef(next_ref, nextTag, 3).then(()=>{
        if (shiftedAllTags.length > 0) {
          // sleep(100).then(() => { getImagesRecursively(shiftedAllTags); });
          getImagesRecursively(shiftedAllTags);
        } else {
          console.log("################### Final updated Gallery:", galleryTags)
          // setGameDownloaded(true) // This is now a hook
          // getImagesFromRef(next_ref, nextTag, 4).then(()=>{
          //   doShuffleAndLay(galleryTags)
          // })
          // console.log(galleryTags)
          
        }
      })
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const getImagesFromRef = async(ref, tagLabel, upperLimit=5) => {
    if (ref==undefined){
      console.log('skipping ref because storage is undefined:', ref)
      return
    }

    await list(ref)
    .then((res) => { 
      // Start index of download can choose in a safe range "window"
      let window = (((res.items).length) > upperLimit)? ((res.items).length-upperLimit-2) : 0; 
      // Start index chosen as random int in range (0, safe length)
      const randomDatabaseImageIndex = Math.floor(Math.random() * (window));
      // Download list length constrained to upperLimit or smaller if less at location
      upperLimit = (window==0)?((res.items).length):upperLimit;
      // Start download
      let galleryVal = []
      // setSort(true)
      console.log('Cutting', tagLabel, ' from ', randomDatabaseImageIndex, ' to ', randomDatabaseImageIndex+upperLimit, 'with max at', (res.items).length-1)
      res.items.slice(randomDatabaseImageIndex, randomDatabaseImageIndex+upperLimit).forEach((itemRef) => {
      

                        getDownloadURL(itemRef).then((y)=> {
                          console.log(y)
                          // getMetadata(itemRef)
                          //   .then((metadata) => {
                              
                              /* (1) Ordering urls by Tag */
                              setGalleryTags(old => {
                                let tagDict = {...old}
                                // if tag is in tagDict: add url. Else: create key-value pair. metadata.customMetadata['tag']
                                if (Object.keys(tagDict).includes(tagLabel)){ 
                                  tagDict[tagLabel].push(y)

                                  // if galleryTags urls reach the upperLimit argument: push them to gallery
                                  console.log(tagLabel, 'is or is not in', tagList, ': ', tagList.includes(tagLabel) )
                                  
                                  // if ( tagLabel == tagList[3] ){ 
                                  //   upperLimit = upperLimit - 2
                                  // }                                  
                                  console.log(tagLabel, 'length to beat: ', upperLimit, 'ie.', upperLimit*tagList.length, 'and we have ', tagDict[tagLabel].length)


                                  if ((tagList.includes(tagLabel) && tagDict[tagLabel].length >= upperLimit)) {
                                    console.log('detected true')
                                    /* (2) Displaying urls on Page */
                                    
                                    setSortingGallery(gallery => {
                                      // gallery urls taken from galleryTags[tag] of length upperLimit
                                      galleryVal = [...gallery, ...tagDict[tagLabel]] 
                                      console.log('val length: '+galleryVal.length)
                                      if (galleryVal.length==(upperLimit*tagList.length)){
                                        setTagDictionary(tagDict)
                                      }
                                      // sorting Gallery: if 12 urls reached, shuffle until only 2 correct in the visible portion.

                                      // if ((galleryVal.length>=(upperLimit*tagList.length))||( tagLabel == tagList[3] )){ // && gameDownloaded(upperLimit*tagList.length)
                                      //   console.log(galleryVal)
                                      //   tagReady = tagDict
                                      //   doShuffleAndLay(tagReady)

                                      // }
                                      
                                      
                                      
                                      return galleryVal
                                    });
                                  };                                   
                                } else {
                                  tagDict[tagLabel]=[y]
                                  // if (tagLabel == tagList[3]){
                                  //   tagReady = tagDict
                                  //   doShuffleAndLay(tagReady)
                                  // }
                                }
                                return tagDict
                                
                              });

                              
                              

                            // }).catch((error) => { // metadata error
                            //   console.log(error)
                            // });

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
    console.log('TAG ',picNb,':', findLabelOfPic(picNb) )

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

      // for (let i=0; i<incorrectTag.length; i++){
      //   if (galleryTags[incorrectTag[i]]?.includes(gallery[picNb-1])){
      //     let feedbackTag = incorrectTag[i]
      //     toast.current.show("Correction: "+feedbackTag+".", { type: "error" });
      //   }
      // }

      toast.current.show("Correction: "+findLabelOfPic(picNb)+".", { type: "error" });
      
      
    }

  }

  const findLabelOfPic = (picNb) => {

    for (let i=0; i<tagList.length; i++){
      if (galleryTags[tagList[i]]?.includes(gallery[picNb-1])){
        let feedbackTag = tagList[i]
        return feedbackTag
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
        set(ref_d(database, `userdata/${ auth.currentUser.uid}/`+selectedFolder+'/tags/'+correctTag + '/'+timestamp), {
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

          // Update Level Accuracy (set by timestamp to prevent resetting)//auth.currentUser.email.split('.')[0]
          set(ref_d(database, `userdata/${auth.currentUser.uid}/`+selectedFolder+'/'+macroName+'/accuracy/'+(gameSetLevel) + '/'+timestamp), {
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
  const ifUserAttempted = (tagId) => {

    try {
      // if (userData[selectedFolder]['tags']==true){
      return (Object.keys(userData[selectedFolder]['tags']).includes(tagList[tagId]))
      // }
      
    } catch {
      console.log('No data, no attempt.')
      return (false)
    }

  }
  const determineTagProgress = (tagId) => {

    try {
      // console.log(Object.keys(userData[selectedFolder]['tags'][tagList[tagId]]))
      let latestRecordingId = Object.keys(userData[selectedFolder]['tags'][tagList[tagId]]).pop()
      // console.log(tagList[tagId], latestRecordingId)
      // console.log(userData[selectedFolder]['tags'][tagList[tagId]][String(latestRecordingId)]['correct'])
      return (userData[selectedFolder]['tags'][tagList[tagId]][latestRecordingId]['correct'])
      
    } catch {
      console.log('No score.')
      return (0)
    }
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
        gameDownloaded: 1,
        galleryTags: galleryTags,
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

        <TouchableHighlight onPress={()=> handlePicSelection(5)}>
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
      animationType="fade"
      transparent={false}
      // backgroundColor='rgba(22, 160, 133, 0.8)'
      visible={modalVisible} //instead of on state change modalVisible
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      >

      <View  style={{backgroundColor:colors.background, marginTop: 20}}> 
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
        <TouchableOpacity  onPress={handleSelectionScreen}>
          <Text style={{...styles.buttonText, color:'black'}}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 13, alignContent: 'flex-end', marginLeft: 20}} > 
        {macroName.toUpperCase()} Game </Text>

          
      </View>
      <View style={{padding: 3}}></View>
          {/* {(hint[(gameSetLevel+1).toString()])?
           <Image source={{uri: `${hint[(gameSetLevel+1).toString()]}`}} style={{height:(webView)?600:200, width:(webView)?1000:330, marginLeft:(webView)?300:15, marginBottom:-150}}></Image>
            : 
            <View></View>
        } */}
        <View style={{flexDirection: 'row'}} >
        <View style={{flexDirection: 'column'}}>
                <TouchableOpacity >
                  <Image 

                    source={{uri:`${galleryTags[tagList[3]]}`,}}
                    style={styles.imageContainer}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][3]}</Text>
                  </View>
                </TouchableOpacity>


                {auth.currentUser?
                <View>
                <Progress.Bar progress= {ifUserAttempted(3)?determineTagProgress(3):0.05 } color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{color: 'orange'}}>{ifUserAttempted(3)?Math.round(determineTagProgress(3)*100)+'%':'Start recording.'}</Text>
                  </View></View>: <View><Progress.Bar progress= {0.1} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{marginBottom:-4}}>{'Login for progress bar.'}</Text>
                  </View></View>
                }
                
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


                <TouchableOpacity >
                <Image 
                  source={{uri:`${galleryTags[tagList[2]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][2]}</Text>
                  </View>
                </TouchableOpacity>

                {auth.currentUser?
                <View>
                <Progress.Bar progress= {ifUserAttempted(2)?determineTagProgress(2):0.05 } color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{color: 'orange'}}>{ifUserAttempted(2)?Math.round(determineTagProgress(2)*100)+'%':'Start recording.'}</Text>
                  </View></View>: <View><Progress.Bar progress= {0.1} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{marginBottom:-4}}>{'Login for progress bar.'}</Text>
                  </View></View>
                }
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
                  source={{uri:`${galleryTags[tagList[1]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][1]}</Text>
                  </View>
                </TouchableOpacity>

                {auth.currentUser?
                <View>
                <Progress.Bar progress= {ifUserAttempted(1)?determineTagProgress(1):0.05 } color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{color: 'orange'}}>{ifUserAttempted(1)?Math.round(determineTagProgress(1)*100)+'%':'Start recording.'}</Text>
                  </View></View>: <View><Progress.Bar progress= {0.1} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{marginBottom:-4}}>{'Login for progress bar.'}</Text>
                  </View></View>
                }                

                
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
                  source={{uri:`${galleryTags[tagList[0]]}`,}}
                  style={styles.imageContainer}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                />
                  <View style={styles.cardLabel}>
                    <Text style={{backgroundColor:colors.cardTag}}>{spoofGameFolders[selectedFolder][selectedGame][0]}</Text>
                  </View>
                </TouchableOpacity>

                {auth.currentUser?
                <View>
                <Progress.Bar progress= {ifUserAttempted(0)?determineTagProgress(0):0.05 } color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{color: 'orange'}}>{ifUserAttempted(0)?Math.round(determineTagProgress(0)*100)+'%':'Start recording.'}</Text>
                  </View></View>: <View><Progress.Bar progress= {0.1} color={'rgb(13, 1, 117)'} style={{backgroundColor:'white'}} borderRadius={20} marginTop={20} width={110} height={30}/>
                <View style={styles.percentLabel}>
                    <Text style={{marginBottom:-4}}>{'Login for progress bar.'}</Text>
                  </View></View>
                }      


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
              <View style={{padding: 20}}></View>

            <View style={styles.modalRow}>
                  <Text style={{fontWeight:"bold", color:"white"}}> ⚠️ Wifi required to play.</Text>  
                <TouchableOpacity
                  style={{...styles.gameSelection}}
                  onPress={() => {
                  if (tagDictionary){
                    doShuffleAndLay(tagDictionary).then(()=>{
                      setModalVisible(!modalVisible)
                    })
                  } else {
                    toast.current.show("Loading game.");
                  }
                    
                  //   if (Platform.OS === "android") {
                  //     // netInfo.isConnected.fetch().then(isConnected => {
                  //       if (netInfo.isConnected) {
                  //         toast.current.show("You are online!");
                  //         setModalVisible(!modalVisible);
                  //       } else {
                  //         toast.current.show("You are offline!");
                  //       }
                  //     // })
                    
                  //   // console.log(hint)
                  // } else {
                  //     toast.current.show("You are online!");
                  //     setModalVisible(!modalVisible);
                  // }
                }}>
                    <Text style={{fontWeight:"bold"}}> {(tagDictionary)?"\n START":"\n LOADING..."}</Text>
                </TouchableOpacity> 
                
                <TouchableOpacity
                  style={{...styles.gameSelection}}
                  onPress={() => {
                    if (tagDictionary){ // Making sure game is downloaded.
                    setModalVisible(!modalVisible);
                    

                    // Loop around macroGameSet
                    macroGameSetLength = Object.keys(spoofMacroGameSets[selectedFolder][macroName]).length
                    macroLevel = macroLevel%macroGameSetLength

                    
                    console.log('updated macroLevel is: ', macroLevel, 'and length: ', Object.keys(spoofMacroGameSets[selectedFolder][macroName]).length)

                    navigation.replace(spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][1], { 
                      gameFile: gameFile,
                      name: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][0],
                      folder: spoofMacroGameSets[selectedFolder][macroName][macroLevel+ 1][2],
                      macroLevel: macroLevel + 1,
                      macroName: macroName,
                      hint: hint, 
                      gameIsThreaded: 1,
                      gameDownloaded: 0,
                      galleryTags: tagDictionary,
                      application: applicationImages,
                      level: gameSetLevel, //gameName?
                      data: (auth.currentUser)?userData:0 })
                    // setGameSetLevel(previous => previous+1)
                    } else {
                      toast.current.show("Loading game.");
                    }
                  }}>
                    <Text style={{fontWeight:"bold"}}> {(tagDictionary)?"\n SKIP LEVEL":"\n LOADING..."} </Text>
                </TouchableOpacity>   
                {(auth.currentUser)?<View></View>: 
                      <TouchableOpacity
                    style={{...styles.gameSelection, backgroundColor: 'blue'}}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.replace('Login')
                      
                    }}>
                      <Text style={{fontWeight:"bold", color:'white'}}> {"\n LOGIN"} </Text>
                  </TouchableOpacity>            
              }


              
            </View>


              {/* </View> */}

      
        </View>
        <View>
                    <Text style={{fontSize:15, color: 'orange', marginLeft: 100, marginTop: 10}}>{'Learning progress scores'.toUpperCase()}</Text>
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


      