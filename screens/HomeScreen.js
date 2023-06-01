import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
// import { Image } from 'expo-image';
import { auth, storage, database } from '../firebase'
import { uid } from 'uid';
import { useNavigation } from '@react-navigation/core'
import { getDownloadURL, getMetadata, getStorage, list, listAll, ref, uploadBytes,  } from 'firebase/storage'
import { ref as ref_d, set, get, onValue } from 'firebase/database'
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase/compat/app';
import ImageSlider from 'react-native-image-slider';
import { useToast } from 'react-native-fast-toast';
import Toast from 'react-native-fast-toast';
// import Toast, { useToast } from 'react-native-toast-notifications';
// import { Platform } from 'react-native/types';
// import Toast from 'react-native-fast-toast/lib/typescript/toast';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';




const HomeScreen = () => {
  // const toast = useToast()
  const toast = useRef(null);
  const [url, setUrl] = useState();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true)
  
  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
  ];
  
  
  // setGallery(images)
  const storage = getStorage();
  var categoryURLs = []
  // categoryURLs.push("sup")
  const [onlineGallery, setOnlineGallery] = useState([]) 
  const [gallery, setGallery] = useState([null])
  const [galleryTags, setGalleryTags] = useState([])
  useEffect(() => {
    const getImage = async() => {
        
        const reference = ref(storage, '/fab.jpeg');
        await getDownloadURL(reference).then((x)=> {
            console.log('downloadable1? : ', x)
            setUrl(x);
        })
        if (url==undefined) {
            console.log('Error on one.')
        }
    }
    
    // getImage()
    const getOnlineImages = async() => {
        const listRef = ref(storage, 'shiba inu/');
        await list(listRef)
        .then((res) => {
          // res.prefixes.forEach((folderRef) => {
          //   // All the prefixes under listRef.
          //   // You may call listAll() recursively on them.
          // });
          // while (counter < res.items.length) {
            
            res.items.forEach((itemRef) => {
            

                              getDownloadURL(itemRef).then((y)=> {
                              getMetadata(itemRef)
                                .then((metadata) => {
                                  
                                  setGalleryTags(old => [...old, metadata.customMetadata['tag']])
                                  // Metadata now contains the metadata for 'images/forest.jpg'
                                })
                                .catch((error) => {
                                  console.log(error)
                                  // Uh-oh, an error occurred!
                                });


                                // newArray.push(y)
                               
                                setOnlineGallery(old => [...old, y])
                                setGallery(old => [...old, y])
              
                            }).catch((error) => {
                              console.log('Error in CatList.')
                              console.log(error)
                              
                              // Uh-oh, an error occurred!
                            });
        
                    
        });
        setLoading(false);
        // Get metadata properties
        
     })
        
      // })
    // return newArray
    //   const listRef = ref(storage, 'shiba inu/');
    //   const res = await listAll(listRef)
    //   const requests = res.items.map(itemRef => getDownloadURL(itemRef))
    //   const urls = await Promise.all(requests)
      // return urls
      // setOnlineGallery(urls)
      
      
    }
    
    getOnlineImages();  
    

    // Find all the prefixes and items.
    
      // console.log(categoryURLs) // empty
      // setOnlineGallery(newOne)
    }, [])  
  
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
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
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
    const in_images = 'shiba inu/'+filename
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

  const handlePicSelection = ( gameName, picNb ) => {
    console.log(gameName)
    let spoofMemo = {'labrador': [2, 3, 6], 
                      'shiba_inu': [1, 4] }
    
    
    // The real memo will have to be image-based. Like a tag.
    console.log('TAGS\n', galleryTags, picNb-1, gameName)
    // For now, we're just using the gallery indexes (picNb)
    console.log(spoofMemo[gameName])
    // if (spoofMemo[gameName].includes(picNb)) {
    if (galleryTags[picNb-1].includes(gameName)) {  
    // New image... from onlineGallery  

      setGallery(prevState => {
          randomInt = Math.floor(Math.random() * onlineGallery.length) ;
          console.log(randomInt)
          // console.log(typeof prevState)
          newState = [...prevState]
          extraImage = onlineGallery[randomInt] //getNewImage();

          setOnlineGallery( prevOnline => {
            prevOnline.splice(randomInt, 1);
            console.log(prevOnline)
            return prevOnline
          })
          
          newState[picNb-1] = extraImage;
          
          return newState})

      toast.current.show("Yes", { type: "failure" });

    } else {

      setGallery(prevState => {

        // console.alog(typeof prevState)
        // newState = [...prevState]
        galleryContents = onlineGallery
        galleryContents.sort( () => .5 - Math.random() );


        // setOnlineGallery( prevOnline => {
        //   prevOnline.splice(randomInt, 1);
        //   console.log(prevOnline)
        //   return prevOnline
        // })
        
        // newState[picNb-1] = extraImage;
        
        return galleryContents})


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
  const [customMetadataInput, onChangeCustomMetadataInput] = useState('category/species');

  

  return (
    <View>
      <Toast ref={toast} />
      <View style={{padding: 20}}></View>
      <View style={{flexDirection: 'row'}}>
      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>
      <View style={{flexDirection: 'column'}}>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 1)}>
        <Image 

          source={{uri:`${gallery[0]}`,}}
          style={{ width: 100, height: 100, borderRadius: 40 }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </TouchableHighlight>
      
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 4)}>
        <Image 
          source={{uri:`${gallery[3]}`,}}
          style={{ width: 100, height: 100, borderRadius: 40 }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />        
      </TouchableHighlight>

      </View>

      <View style={{flexDirection: 'column'}}>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 2)}>
      <Image 
        source={{uri:`${gallery[1]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 5)}>
      <Image 
        source={{uri:`${gallery[4]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </TouchableHighlight>
      </View>
      <View style={{flexDirection: 'column'}}>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 3)}>
      <Image 
        source={{uri:`${gallery[2]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba_inu', 6)}>
      <Image 
        source={{uri:`${gallery[5]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </TouchableHighlight>
      </View>
      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>
    </View>

    <View style={styles.container}>
        
      <Text>Email: {auth.currentUser?.email}</Text>

      

     <TouchableOpacity style={styles.button} onPress={pickImage} >
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={uploadImage} >
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TextInput
      onChangeText={onChangeCustomMetadataInput}
      value={customMetadataInput}
      style={styles.input}>

        
      </TextInput>



    </View>
    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
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
        borderRadius:50,
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
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
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
      imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
      },
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


})


      