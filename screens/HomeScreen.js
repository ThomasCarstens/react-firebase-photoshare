import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight, TextInput, StatusBar } from 'react-native'
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
// import Toast, { useToast } from 'react-native-toast-notifications';
// import { Platform } from 'react-native/types';
// import Toast from 'react-native-fast-toast/lib/typescript/toast';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';

//https://www.wineware.co.uk/glassware/beginners-guide-to-different-types-of-wine-glasses


const HomeScreen = (props) => {
  const gameName = "Dogs"
  // const gameName = props.route.params?.name // TBD | Reinstate.
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
  const [learningLevel, setLearningLevel] = useState(1)
  
  
  
  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
  ];

  // Later on, each storage folder is linked to an instruction + correct tag
  const spoofInstructions = {
    1: 'Level 1: Dogs: where is the Shiba Inu?',
    2: 'Level 2: Nuts: find the walnuts',
    3: 'Level 3: Wines: where are the Red Wine Glasses?',
    4: 'Game complete.'
  }

  const spoofCorrectTag = {
  'Dogs': {
    1: 'Boxer',
    2: 'Bullmastiff',
    3: 'Mastiff',
  }
}

  const spoofIncorrectTag= {
    'Dogs': {
      1: 'Bullmastiff',
      2: 'Boxer',
      3: 'Bullmastiff',      
    }
    
  }
  const [incorrectTag, setIncorrectTag ] = useState('Bullmastiff')
  const [instructionText, setInstructionText] = useState(spoofInstructions[learningLevel])
  const [correctTag, setCorrectTag] = useState(spoofCorrectTag[gameName][learningLevel])

  useEffect(() => {
    navigation.setOptions({
      title: gameName+': '+learningLevel+'. '+correctTag,
    });
  }, []);

  // Game parameters.
  useEffect(() => {
    setInstructionText(spoofInstructions[learningLevel]); //TBD. Database.
    setCorrectTag(spoofCorrectTag[gameName][learningLevel])
    setIncorrectTag(spoofIncorrectTag[gameName][learningLevel])
    console.log('Level: ___'+ learningLevel)
  }, [learningLevel])

  // Images from different sources.
  useEffect(()=> {
    const correctListRef = ref(storage, gameName + '/'+correctTag+'/');
    const incorrectListRef = ref(storage, gameName + '/'+incorrectTag+'/');
    // reinitialise current gallery 
    setGallery(old => [])
    setGalleryTags(old => [])
    getImagesFromRef(correctListRef)
    getImagesFromRef(incorrectListRef)
  }, [correctTag, incorrectTag])

  const getImagesFromRef = async(ref) => {
    // TBD | according to gameName
    await list(ref)
    .then((res) => {
      
      // .
      // sliced to 10 correct tags
      res.items.slice(0, 3).forEach((itemRef) => {
      

                        getDownloadURL(itemRef).then((y)=> {

                        // Metadata works... but not efficient for large batches.

                        getMetadata(itemRef)
                          .then((metadata) => {
                            
                            setGalleryTags(old => [...old, metadata.customMetadata['tag']])
                            // Metadata now contains the metadata for 'images/forest.jpg'
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
                          setOnlineGallery(old => [...old, y])
                          setGallery(old => [...old, y])

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

    /* Spoof Memo (now removed): we're just using the gallery indexes (picNb)
       let spoofMemo = {'labrador': [2, 3, 6], 
                         'shiba_inu': [1, 4] }
       console.log(spoofMemo[gameName])
       if (spoofMemo[gameName].includes(picNb)) {
    */

  // TBD | gameName is associated to the Selection Screen.

  // The real memo is now image-based. Like a tag.
    console.log('TAGS\n', galleryTags, picNb-1)

    if (galleryTags[picNb-1].includes(correctTag)) {  
    // New image... from onlineGallery  

      setGallery(prevState => {
          let randomInt = Math.floor(Math.random() * onlineGallery.length) ;
          if (randomInt == picNb-1){
            randomInt = picNb
          }
          // console.log(randomInt)
          // console.log(typeof prevState)
          let newState = [...prevState]



          setOnlineGallery( prevOnline => {
            prevOnline.splice(randomInt, 1);
            // prevOnline.splice(picNb-1, 1);
            // console.log(prevOnline)
            return prevOnline
          })
          setGalleryTags( prevOnline => {
            prevOnline.splice(randomInt, 1);
            // prevOnline.splice(picNb-1, 1);
            // console.log(prevOnline)
            return prevOnline
          })

          let extraImage = onlineGallery[randomInt] //getNewImage();

          // error is that randomInt could well be the pic that we want to replace.
          // TBD
          
          newState.splice(randomInt, 1);          

          newState[picNb-1] = extraImage;
          
          return newState})
      setCorrectClickCount(prevState=> prevState+1)
      toast.current.show("Yes", { type: "failure" });

    } else {
      // 
      setGallery(prevState => {


        // galleryContents = onlineGallery

        // mixing up
        // galleryContents.sort( () => .5 - Math.random() );

        
        return prevState})

      setIncorrectClickCount(prevState=> prevState+1)
      toast.current.show("No", { type: "failure" });
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
      return 0
    } else {
    let averageCorrectRate = (correctClickCount == 0)? 0: (correctClickCount/(correctClickCount+incorrectClickCount))

    var index = 0
    var correctLeftInGallery = galleryTags.filter((value) => {
      index++
      console.log(index)
      return (value.includes("shiba_inu") && index<6 )
    })
    // || ((correctLeftInGallery.length == 0 ) && !loading)
    if ((averageCorrectRate > 0.8) ){
      // Next level when 80% correct rate OR no more correctLeftInGallery  
      setCorrectClickCount(0)  //reset (avoid loop)
      setIncorrectClickCount(0)
      console.log('Level Up.')

      // Learning Level changes the gallery + instructions

      setLearningLevel(prev => prev+1) 
      
      

      
      

      
      
    }
    
    console.log("correct ones in gallery: ", correctLeftInGallery)
    // correct images that are yet-unclicked from the 6 in view.
    // average correct click rate over correct+incorrect clicks -- it's 0 if correct is 0.

    // ERROR with ||
    
    return averageCorrectRate
  }
  }
{/* <SafeAreaView style ={styles.webContainer}>
    <View style ={styles.webContent}> */}
  return (
    
    <View>
      <Toast ref={toast} />
      <View style={{padding: 10}}></View>
      <Text style={{fontSize: 20}}> {instructionText} </Text>
      <View style={{padding: 10}}></View>
      <View style={{flexDirection: 'row'}} >
      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>

      

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

      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>
    </View>
    {/* <View padding={70} ></View> */}
    <View padding={60} style={{flexDirection: 'row'}} /* for the progress bar */ >
      <Text>Progress: </Text>
      <Progress.Bar progress={progressCalculate()}  width={200} height={20}/>
      
      
    </View>
    

    
    {/* <View style={styles.container}>
      <View style={{padding: 20}}></View>

      <View style={styles.progressBar}>
      </View>
      <Text style={styles.text3}>{(100*correctClickCount/(correctClickCount+incorrectClickCount)).toFixed(2)}%</Text>

      <StatusBar style="auto" />
    </View> */}


    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      
      <TextInput
      onChangeText={onChangeCustomMetadataInput}
      value={customMetadataInput}
      style={styles.input}>
      </TextInput> 

     <TouchableOpacity style={styles.button} onPress={pickImage} >
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={uploadImage} >
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSelectionScreen}>
        <Text style={styles.buttonText}>Game Selection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>





    </View>
    </View>
 
  )
    //  </View>
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
        width:100,
        height:100,
        borderRadius:20,
        
        // resizeMode: 'contain',
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
        backgroundColor: '#0782F9',
        width: '60%',
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
    // END OF WEB VIEW.
})


      