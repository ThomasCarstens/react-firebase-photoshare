import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Image } from 'expo-image';
import { auth, storage, database } from '../firebase'
import { uid } from 'uid';
import { useNavigation } from '@react-navigation/core'
import { getDownloadURL, getStorage, ref, uploadBytes,  } from 'firebase/storage'
import { ref as ref_d, set, get, onValue } from 'firebase/database'
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase/compat/app';
import ImageSlider from 'react-native-image-slider';

// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';

const HomeScreen = () => {
  const [url, setUrl] = useState();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  var images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
  ];
  const [gallery, setGallery] = useState(images)
  const storage = getStorage();

  useEffect(() => {
    const getImage = async() => {
        
        const reference = ref(storage, '/fab.jpeg');
        await getDownloadURL(reference).then((x)=> {
            console.log('downloadable? : ', x)
            setUrl(x);
        })
        if (url==undefined) {
            console.log('Error on download.')
        }
    }

    getImage()
  })

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
    const metadata = {
      contentType: 'image/jpeg',
    };
    
    console.log('image name is: ', filename)
    // var ref = firebase.storage().ref().child(filename).put(blob);
    // try {
    //     await ref;
    // } catch(error) {
    //     console.log(error.message)
    // } 
    const in_images = 'images/'+filename
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

  const handlePicSelection = ( gameName, picNb ) => {
    console.log(gameName)
    let spoofMemo = {'labrador': [2, 3, 6], 
                      'shiba inu': [1, 4] }
    console.log(spoofMemo[gameName])
    if (spoofMemo[gameName].includes(picNb)) {
      // activate green shade
      // alert('Correct answer')
      ToastAndroid.showWithGravity(
        'Correct answer',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      // change picture
      currentGallery=gallery
      console.log(currentGallery)
      currentGallery[picNb-1] = 'https://placeimg.com/640/640/beer';
      setGallery(currentGallery)
    } else {
      ToastAndroid.showWithGravity(
        'Error',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    return
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

  var frontImage = (image.uri)?(image.uri):url
  

  const _onMomentumScrollEnd = (e, state, context) => {
    console.log(state, context)
  };

//   _renderItem = ({item, index}) => {
//     return (
//         <View style={styles.slide}>
//             <Text style={styles.title}>{ item.title }</Text>
//         </View>
//     );
// }



  return (
    <View>
      <View style={{padding: 20}}></View>
      <View style={{flexDirection: 'row'}}>
      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>
      <View style={{flexDirection: 'column'}}>
      <TouchableHighlight onPress={()=> handlePicSelection('shiba inu', 1)}>
        <Image 
          source={{uri:`${gallery[0]}`,}}
          style={{ width: 100, height: 100, borderRadius: 40 }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </TouchableHighlight>
      
      <TouchableHighlight onPress={()=> handlePicSelection('shiba inu', 4)}>
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
      <TouchableHighlight onPress={()=> handlePicSelection('shiba inu', 2)}>
      <Image 
        source={{uri:`${gallery[1]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </TouchableHighlight>
      <Image 
        source={{uri:`${gallery[4]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </View>
      <View style={{flexDirection: 'column'}}>
      <Image 
        source={{uri:`${gallery[2]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <Image 
        source={{uri:`${gallery[5]}`,}}
        style={{ width: 100, height: 100, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </View>
      <View style={{ flex: 1, width: 20, height: 200, backgroundColor: 'green' }}/>
    </View>

    <View style={styles.container}>
        
      <Text>Email: {auth.currentUser?.email}</Text>

      {/* <Image 
        // style={styles.imageContainer} 
        
        source={{uri:`https://placeimg.com/640/640/nature`,}}
        // style={styles.imageContainer} 
        style={{ width: 300, height: 300, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      /> */}

      {/* <Image 
        source={{uri:`${frontImage}`,}}
        style={{ width: 300, height: 300, borderRadius: 40 }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      /> */}
      
      

     <TouchableOpacity style={styles.button} onPress={pickImage} >
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={uploadImage} >
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      {/* <Carousel
              ref={(c) => { this._carousel = c; }}
              data={images}
              renderItem={this._renderItem}
              sliderWidth={"40px"}
              itemWidth={"40px"}
              windowSize={10}
            /> */}

    </View>
    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
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