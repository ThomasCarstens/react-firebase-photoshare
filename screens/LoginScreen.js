import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
                navigation.replace("Selection")
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

        signInWithEmailAndPassword(auth,email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('logged in with:', user.email);
        
        }).catch(error => alert(error.message))            
            
    }

    const handleAnonUser = () => {
        navigation.replace("Selection")
    }
{/* <SafeAreaView style={{...styles.webContainer}}> 
            <View style={{...styles.webContent}}>    */}
    return (
    

    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <Image source={require("../assets/bg/learnFast.png")} style={{height:150, width:300, marginLeft:0, borderRadius: 20}}></Image>
        <View padding={20}></View>
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
                style={[styles.button, styles.buttonOutline]} >
                 <Text style={styles.buttonOutlineText}> Login </Text>   
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]} >
                 <Text style={styles.buttonOutlineText}> Sign Up </Text>   
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleAnonUser}
                style={[styles.buttonRed, styles.buttonOutlineRed]}>
                 <Text style={styles.buttonOutlineTextRed} > Try without an account </Text>   
            </TouchableOpacity>
            
        </View>
    </KeyboardAvoidingView>
    
  )
//   </View>
//          </SafeAreaView>
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
    buttonRed: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonOutlineRed: {
        backgroundColor: 'white', 
        marginTop: 5,
        borderColor: 'rgb(207, 107, 107)',
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
    buttonOutlineTextRed: {
        color: 'rgb(207, 107, 107)',
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

    

})