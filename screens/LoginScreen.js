import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react'
import { auth, firebase } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user=> {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with: ', user.email);
          
          }).catch(error => alert(error.message))
    }

    const handleLogin = () => {
        //  auth.setPersistence('session')
        //  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        //     .then(function() {
        //         // Existing and future Auth states are now persisted in the current
        //         // session only. Closing the window would clear any existing state even
        //         // if a user forgets to sign out.
        //         // ...
        //         // New sign-in will be persisted with session persistence.
        //         return signInWithEmailAndPassword(auth, email, password);
        //     })
        //     .catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //     });
        // (async () => {
        //     await setPersistence(auth, browserLocalPersistence);
        //   })
        // setPersistence(auth, auth.setPersistence.NONE)
        // .then(()=> {
        signInWithEmailAndPassword(auth,email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('logged in with:', user.email);
        
        }).catch(error => alert(error.message))            
            
        // });

        // AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));


        // signInWithEmailAndPassword(auth,email, password)
        //   .then(userCredentials => {
        //     const user = userCredentials.user;
        //     console.log('logged in with:', user.email);
          
        //   }).catch(error => alert(error.message))
    }

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text) }
                style={styles.input}/>

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text) }
                style={styles.input}
                secureTextEntry/>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.externalMedia} >
                 <Text style={styles.buttonText}> Login </Text>   
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]} >
                 <Text style={styles.buttonOutlineText}> Register </Text>   
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputContainer: {

        width: '80%',
    },

    input: {
        backgroundColor: 'white', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },
    
    externalMedia: {
        backgroundColor: 'green',
        width: '30%',
        padding: 15,
        borderRadius: 35,
        alignItems: 'center',
        marginTop: 40,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonOutline: {
        backgroundColor: 'white', 
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
        
    },

    buttonText: {
        color: 'white',
        fontWeight: '700', 
        fontSize: 16,
    },

    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700', 
        fontSize: 16,
    },



    

})