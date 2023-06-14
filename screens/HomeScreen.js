import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight, TextInput, StatusBar, Modal, Platform, Linking } from 'react-native'
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
import { spoofGameSets, spoofOutcomeImages, spoofInstructions, spoofIncorrectTag, spoofCorrectTag} from '../gameFile';
import * as ScreenOrientation from 'expo-screen-orientation';

// import Toast, { useToast } from 'react-native-toast-notifications';
// import { Platform } from 'react-native/types';
// import Toast from 'react-native-fast-toast/lib/typescript/toast';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';

//https://www.wineware.co.uk/glassware/beginners-guide-to-different-types-of-wine-glasses


const HomeScreen = (props) => {
  const selectedGame = props.route.params?.name  // TBD | Reinstate with navigation.
  const userData = props.route.params?.data  // TBD | Reinstate with navigation.
  const hint = props.route.params.hint
  const [gameSetLevel, setGameSetLevel] = useState((auth.currentUser)?props.route.params?.level:3)

  // Screen title.
  useEffect(() => {
    navigation.setOptions({
      title: gameName+' Game',
    });

    if (!webView){
      ScreenOrientation.lockAsync(2); //LANDSCAPE_LEFT
    } 
    /* CAREFUL, VISIBLE PERFORMANCE LIMITATIONS. */
    // const A = ref(storage, "Terriers" + '/' + "Bull Terrier" + '/');
    // const B = ref(storage, "Terriers" + '/' + "Boston Terrier" + '/');
    // const C = ref(storage, "Terriers" + '/' + "American Staffordshire Terrier" + '/');
    // const D = ref(storage, "Terriers" + '/' + "Staffordshire Bull Terrier" + '/');
    // labelBatch(A, "Bull Terrier");
    // labelBatch(B, "Boston Terrier");
    // labelBatch(C, "American Staffordshire Terrier");
    // labelBatch(D, "Staffordshire Bull Terrier");
    // const E = ref(storage, "Africa_country_of_location" + '/'+"Morocco"+'/');
    // const F = ref(storage, "Africa_country_of_location" + '/'+"Algeria"+'/');
    // const G = ref(storage, "Africa_country_of_location" + '/'+"Tunisia"+'/');
    // const H = ref(storage, "Africa_country_of_location" + '/'+"Libya"+'/');
    // labelBatch(E, "Morocco")
    // labelBatch(F, "Algeria")
    // labelBatch(G, "Tunisia")
    // labelBatch(H, "Libya")



      
     
    // } else {
    //   setGameSetLevel(0)
    //   // const userLearningLevel = 1 //TBD | Get from database.
    // }


  }, []);

  
  
 
      


  
  // gameName = gameName?gameName:"shiba inu"

  // const toast = useToast()
  const toast = useRef(null);
  const [url, setUrl] = useState();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true)
  const [correctClickCount, setCorrectClickCount] = useState(0)
  const [incorrectClickCount, setIncorrectClickCount] = useState(0)
  const [learningLevel, setLearningLevel] = useState(1) // TBD | Keep user game level
  const [successRate, setSuccessRate] = useState(1)
  const [modalVisible, setModalVisible] = useState(true)

  
  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
  ];
    
  
  
  var gameName = spoofGameSets[selectedGame][gameSetLevel]
  console.log(gameName, "is the game noww.")
  // const [gameName, setGameName ] = useState(spoofIncorrectTag[gameName][learningLevel]) // this is an issue upon first load.
  const [incorrectTag, setIncorrectTag ] = useState(spoofIncorrectTag[gameName][learningLevel]) // this is an issue upon first load.
  const [instructionText, setInstructionText] = useState(spoofInstructions[gameName][learningLevel])
  const [correctTag, setCorrectTag] = useState(spoofCorrectTag[gameName][learningLevel])
  const [sort, setSort] = useState(false)
  // const [outcomeImage, setOutcomeImage] = useState(spoofOutcomeImages[gameName][learningLevel])
  const [progressInGame, setProgressInGame] = useState(learningLevel/(Object.keys(spoofInstructions[gameName]).pop()))
  const [gameComplete, setGameComplete] = useState(false)
  const [gameSetComplete, setGameSetComplete] = useState(false)
  const webView = (Platform.OS == 'web') // testing with 'web' or 'android'

  

  
  // Game parameters.
  useEffect(() => {
    
    
    // At end of 1 game
    if (learningLevel == Object.keys(spoofInstructions[gameName]).length) {
      setGallery([]) // At the start to remove prior gameframes 
      setGameComplete(true)
      let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))
      setInstructionText(spoofInstructions[gameName][learningLevel] + ' Rating: '+ (100*averageCorrectRate).toFixed(0) + '%'); //TBD. Database.

      
      return
    }
    
    // Within stages of 1 game
    setInstructionText(spoofInstructions[gameName][learningLevel]); //TBD. Database.
    setCorrectTag(spoofCorrectTag[gameName][learningLevel])
    setIncorrectTag(spoofIncorrectTag[gameName][learningLevel])
    // setOutcomeImage(spoofOutcomeImages[gameName][learningLevel])
    setProgressInGame ( learningLevel/(Object.keys(spoofInstructions[gameName]).pop()) )
    
  }, [learningLevel, gameSetLevel])

  useEffect(() => {
    toast.current.show(instructionText, { type: "success" });
  }, [instructionText])

  // Images from different sources.
  useEffect(()=> {
    const correctListRef = ref(storage, gameName + '/'+correctTag+'/');
    const incorrectListRef = ref(storage, gameName + '/'+incorrectTag[0]+'/');
    if (incorrectTag.length>1){
      var incorrectListRef2 = ref(storage, gameName + '/'+incorrectTag[1]+'/');
    }

    // const incorrectListRef2 = ref(storage, gameName + '/'+incorrectTag[1]+'/');
    // reinitialise current gallery 
    setGallery(old => [])
    setGalleryTags(old => [])
    // const labelListRef = ref(storage, gameName + '/'+'Mastiff'+'/');
    // labelBatch(labelListRef, 'Mastiff')
    
      getImagesFromRef(incorrectListRef).then(()=>{

        getImagesFromRef(correctListRef, 5).then(()=> {
          if (incorrectListRef2){
            getImagesFromRef(incorrectListRef2)
          }
        })

        // if (typeof incorrectTag != Array){
        //   const incorrectListRef = ref(storage, gameName + '/'+incorrectTag+'/');
        //   getImagesFromRef(incorrectListRef)
        // } else {
        //   const incorrectListRef = ref(storage, gameName + '/'+incorrectTag[0]+'/');
        //     getImagesFromRef(incorrectListRef).then(()=>{

        //     const incorrectListRef2 = ref(storage, gameName + '/'+incorrectTag[1]+'/');
        //     getImagesFromRef(incorrectListRef2)
        //   })
        // }
      })     
    // }

    
    
    // console.log(galleryTags)
  }, [correctTag, incorrectTag])

  // useEffect(()=> {
  //   if (gallery.length>5) {
  //     setGallery((prevOrder)=>{
  //     console.log(prevOrder[0])
  //     let temp = prevOrder[0]
  //     prevOrder[0] = prevOrder[3]
  //     prevOrder[3] = temp
  //     // [prevOrder[0], prevOrder[3]]=[prevOrder[3], prevOrder[0]]
  //     return prevOrder
  //   })
  //   }
    
  // }, [sort])

  // TBD | UpperLimit on different game types.

  const getImagesFromRef = async(ref, upperLimit=3) => {
    // TBD | according to gameName
    await list(ref)
    .then((res) => {
      const randomDatabaseImageIndex = Math.floor(Math.random() * ((res.items).length)-upperLimit);
      
      // .
      // sliced to 10 correct tags
      res.items.slice(randomDatabaseImageIndex, randomDatabaseImageIndex+upperLimit).forEach((itemRef) => {
      

                        getDownloadURL(itemRef).then((y)=> {

                        // Metadata works... but not efficient for large batches.

                        getMetadata(itemRef)
                          .then((metadata) => {
                            
                            setGalleryTags(old => {
                              let val = [...old, metadata.customMetadata['tag']]
                              if (val.length%6==0){
                                // let randomInt = Math.floor(Math.random() * onlineGallery.length) ;
  
                                let temp = val[0]
                                val[0] = val [3]
                                val[3] = temp
  
                                // randomInt = Math.floor(Math.random() * onlineGallery.length) ;
                                temp = val[2]
                                val[2] = val [5]
                                val[5] = temp
                                
                              }
                              return val
                                
                            // Metadata now contains the metadata for 'images/forest.jpg'
                          })
                          })
                          .catch((error) => {
                            console.log(error)
                            // Uh-oh, an error occurred!
                          });
                          

                          // This was a workaround... but it labelled everything at once. (/!\ DO NOT SPLIT FOR-EACH)
                          // const metadata = {
                          //       contentType: 'image/jpeg',
                          //       customMetadata: {
                          //         'tag': correctTag
                          //       }
                          //     };
                          // updateMetadata(itemRef, metadata)
                          // .then((metadata) => {
                          //   // Updated metadata for 'images/forest.jpg' is returned in the Promise
                          // }).catch((error) => {
                          //   // Uh-oh, an error occurred!
                          // });

                          // setGalleryTags(old => [...old, correctTag])
                          setGallery(old => {
                            let val = [...old, y]
                            if (val.length%6==0){
                              // let randomInt = Math.floor(Math.random() * onlineGallery.length) ;

                              let temp = val[0]
                              val[0] = val [3]
                              val[3] = temp

                              // randomInt = Math.floor(Math.random() * onlineGallery.length) ;
                              temp = val[2]
                              val[2] = val [5]
                              val[5] = temp

        

                            }
                            return val
                          })

                          
                          // setGallery(old => [...old, y])
                          
                          // if (gallery.length > 3) {
                          //   setSort(true)
                          // }
                          // Make sure render is loaded in useEffect (issue with progress bar upon first setGallery)
                          // setTimeout(() => {
                          //   console.log("Set as loaded after 1 seconds.");
                          //   setLoading(false); // Inefficient
                          // }, 2000);
                          
                          
                      }).catch((error) => {
                        console.log('Error in CatList.')
                        console.log(error)
                    
                      });

              
      });



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
                          

                          // This was a workaround... but it labelled everything at once. (/!\ DO NOT SPLIT FOR-EACH)
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
                    
                      });

              
      });



      })


  }

  const getOnlineImages = ( ) => {

    //   setGallery((previousOrder)=>{
    //   newOrder = previousOrder
    //   for (i=0; i<6; i++){
    //     [ newOrder[i*2 + 1], newOrder[i*2 + 11] ] = [ newOrder[i*2 + 11], newOrder[i*2 + 1] ];
        
    //   }
    //   console.log('sorting')
    //   return newOrder
    // })

  
  
  
}
  // setGallery(images)
  const storage = getStorage();
  var categoryURLs = []
  // categoryURLs.push("sup")
  const [onlineGallery, setOnlineGallery] = useState([]) 
  const [gallery, setGallery] = useState([null])
  const [galleryTags, setGalleryTags] = useState([])


  

  // useEffect(() => {
    
  //   const getImage = async() => {
        
  //       const reference = ref(storage, '/fab.jpeg');
  //       await getDownloadURL(reference).then((x)=> {
  //           console.log('downloadable1? : ', x)
  //           setUrl(x);
  //       })
  //       if (url==undefined) {
  //           console.log('Error on one.')
  //       }
  //   }
    
  //   // getImage()
    
    
  //   getOnlineImages();  
    

    

  //   // Find all the prefixes and items.
    
  //     // console.log(categoryURLs) // empty
  //     // setOnlineGallery(newOne)
  //   }, [])  
  
  console.log('LENGTH: ', onlineGallery.length)

  const pushImage = (y) => {
    if (onlineGallery) {
      setOnlineGallery(current => [...current, y])
    } else {
      setOnlineGallery([y])
    }
  }


  // console.log('hey' ,newOne)
  // setOnlineGallery(newOne)
  // console.log('oooh', categoryURLs)
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
    // var ref = firebase.storage().ref().child(filename).put(blob);
    // try {
    //     await ref;
    // } catch(error) {
    //     console.log(error.message)
    // } 
    const in_images = gameName+'/'+correctTag+'/'+filename
    const storageRef = ref(storage, in_images)
    // uploadBytes(storageRef, filename).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });

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


  const getNewImage = () => {

  }

  const handlePicSelection = ( picNb ) => {
    // Also removed gallery for good measure
    
    if (gameComplete||gameSetComplete){
      toast.current.show("Game Complete!", { type: "error" });
      return
    }



    setLoading(false)
    /* Spoof Memo (now removed): we're just using the gallery indexes (picNb)
       let spoofMemo = {'labrador': [2, 3, 6], 
                         'shiba_inu': [1, 4] }
       console.log(spoofMemo[gameName])
       if (spoofMemo[gameName].includes(picNb)) {
    */

  // DONE | gameName is associated to the Selection Screen.
      
  // The real memo is now image-based. Like a tag.
    console.log('TAGS\n', galleryTags, picNb-1)
    let randomInt = Math.floor(Math.random() * gallery.length) ;
    console.log('randomInt', randomInt)

    // CASE: Picture correctly selected.
    if (galleryTags[picNb-1]?.includes(correctTag)) {  
    // REMOVE Picture 
      setGallery(prevState => {
          
          let newState = [...prevState]

          setGalleryTags( prevOnline => {
            prevOnline.splice(picNb-1, 1);
            return prevOnline
          })

          newState.splice(picNb-1, 1);                   
          return newState})
      setCorrectClickCount(prevState=> prevState+1)



    } else {
      // DO NOTHING.
      setGallery(prevState => {


        // galleryContents = onlineGallery

        // mixing up (not done well bc tags no longer aligned)
        // galleryContents.sort( () => .5 - Math.random() );

        
        return prevState})

      setIncorrectClickCount(prevState=> prevState+1)
      toast.current.show("That's a "+galleryTags[picNb-1]+".", { type: "error" });
    }

    return images
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

  // var frontImage = (image.uri)?(image.uri):url
  // console.log(onlineGallery)

  const _onMomentumScrollEnd = (e, state, context) => {
    console.log(state, context)
  };
  const [customMetadataInput, onChangeCustomMetadataInput] = useState('nut/almond');
  

  const handleSelectionScreen = () => {
    navigation.replace("Selection")
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
    var correctLeftInGallery = galleryTags.filter((value) => {
      index++
      console.log(index)
      return (value.includes(correctTag) && index<7 )
    })
    // || ((correctLeftInGallery.length == 0 ) && !loading)
    // if ((averageCorrectRate > 0.8) ){
    console.log('level if 0: ', correctLeftInGallery.length)

    
    // END OF GAME
    if (correctLeftInGallery.length == 0){
      setLoading(true)
      // Next level when 80% correct rate OR no more correctLeftInGallery  
      setCorrectClickCount(0)  //reset (avoid loop)
      setIncorrectClickCount(0)
      setSuccessRate(prev => (prev+averageCorrectRate)/2) // will be reset once per game.
      console.log('successRate: ', successRate)
      console.log('Level Up.')

      // On last game of gameSet --- set gameSetComplete == true
      if (gameSetLevel+1 >= Object.keys(spoofGameSets[selectedGame]).length) {
        setGameSetComplete(true)
      }
      // Learning Level changes the gallery + instructions
      setLearningLevel(prev => prev+1) 
    }
    
    console.log("correct ones in gallery: ", correctLeftInGallery)
    // correct images that are yet-unclicked from the 6 in view.
    // average correct click rate over correct+incorrect clicks -- it's 0 if correct is 0.

    // ERROR with ||
    
    return progressInGame
  }
  }
  {/* <SafeAreaView style ={styles.webContainer}>
      <View style ={styles.webContent}>  */}

  const nextGameSetLevel = () => {
    if (gameSetLevel+1 < Object.keys(spoofGameSets[selectedGame]).length) {
      if (auth.currentUser) {
          let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))
          // Update user -> game -> level: gameSetLevel  
          set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedGame), {
            gameSetLevel: gameSetLevel+1,
          }).catch(error =>alert(error.message));        
          // Update user -> game -> accuracy -> level: gameSetLevel  
          set(ref_d(database, `${auth.currentUser.email.split('.')[0]}/`+selectedGame+'/accuracy'), {
            [gameSetLevel]: averageCorrectRate,

          }).catch(error =>alert(error.message));    
        }

      setGameSetLevel(previous => previous+1)
      // setGameSetComplete(false)
      setLearningLevel(1)
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
{/* <SafeAreaView style={{...styles.webContainer}}> 
             <View style={{...styles.webContent}}>  */}
  return (
    
    
    <View>
      <Toast ref={toast} />
      <View style={{padding: 15}}></View>
      <Text style={{fontSize: 13, alignContent: 'flex-end'}} >  GAME {gameSetLevel+1} </Text>
      <Text style={{fontSize: 20}}> {instructionText} </Text>
      <View style={{padding: 10}}></View>
      <View style={{flexDirection: 'row'}} >
      <View style={{ flex: 1, width: 20, height: 150*3, backgroundColor: 'rgb(13, 1, 117)' }}/>

      

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
        source={{uri:`${gallery[4]}`,}}
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

      <TouchableHighlight onPress={()=> handlePicSelection(4)}>
        <Image 
          source={{uri:`${gallery[3]}`,}}
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

      <View   style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>

      <TouchableOpacity  padding={50}  style={styles.button} onPress={openModal} >
            <Text style={styles.buttonText}>Hint</Text>
      </TouchableOpacity>
      
      {/* Explanation -- if GameComplete: Button NEXT LEVEL. if NOT GameComplete: Progress BAR */}

      {(gameComplete&&(!gameSetComplete))? //if between games
        <TouchableOpacity  padding={50}  style={styles.button} onPress={nextGameSetLevel} >
              <Text style={styles.buttonText}>Next Level</Text>
        </TouchableOpacity>
      :(gameSetComplete)? //if at end of game set
      <TouchableOpacity  padding={50}  style={styles.buttonRainbox} onPress={navigation.replace('Score', { 
        lastscore: 99.99, 
        data:  (auth.currentUser)?userData:0 })}>
            <Text style={styles.buttonText}>Finish</Text></TouchableOpacity>
      : /*else if game is not complete*/
      <Progress.Bar progress={progressCalculate()} color={'rgb(13, 1, 117)'}  borderRadius={20} marginTop={20} width={130} height={30}/>
      }

    </View>
    

    
    {/* <View style={styles.container}>
      <View style={{padding: 20}}></View>

      <View style={styles.progressBar}>
      </View>
      <Text style={styles.text3}>{(100*correctClickCount/(correctClickCount+incorrectClickCount)).toFixed(2)}%</Text>

      <StatusBar style="auto" />
    </View> */}


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

      <TouchableOpacity style={styles.button} onPress={handleSelectionScreen}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

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

    {/* SAFE AREA !! */}
     {/* <SafeAreaView style ={styles.webContainer}>
        <View style ={styles.webContent}>    */}
      <View backgroundColor='rgba(46, 204, 113, 0.8)'>
          {/* <View style={{ flexDirection:"row"}}> */}
            {/* <View padding={400} ></View> */}
          
            <View style={styles.modalRow}>

              <TouchableOpacity
                style={styles.gameSelection}
                onPress={() =>Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfUEBELjhxyWh9OnZihgpEBbdzfSr1nO1hb5atfWFZfEsZgzg/viewform?usp=sf_link')}
                >
                <Text color="red">{"No hint was supplied. Click here if you think it's a mistake and you want to signal it."}</Text> 
      
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  setModalVisible(!modalVisible);

                  navigation.navigate('Selection')
                }}>
      
                <Text> {"\n EXIT TO GAME SELECTION"} </Text>
              </TouchableOpacity> */}
              <Image source={{uri: `${hint[gameSetLevel]}`}} style={{height:200, width:330, marginLeft:15, marginBottom:-700}}></Image>

              <TouchableOpacity
                style={styles.gameSelection}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  console.log(hint)
                }}>
                  <Text style={{fontWeight:"bold"}}> {"\n GOT IT"} </Text>
              </TouchableOpacity>  
              

            {/* </View> */}

          </View>
      </View>
      {/* </View>

     </SafeAreaView>  */}
      </Modal>
    </View>
     
  )
// </View>
// </SafeAreaView>  
}

export default HomeScreen


const styles = StyleSheet.create({
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
        width:150,
        height:150,
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
      left: '4%',
      top: '57%',
      justifyContent: "flex-start",
      alignItems: 'center',
      width: 200,
      height: 50,
      marginTop:160,
      // backgroundColor:'rgba(144, 144, 0, 0.8)',
      backgroundColor:'rgba(102, 140, 190, 1)',
      borderRadius: 50
    },

    modalRow: {
      top: '-60%',
      width: '600%',
      height: '100%', 
      flexDirection : 'column', 
      justifyContent: 'space-evenly',
    },
})


      