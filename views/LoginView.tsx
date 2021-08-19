/**
 * @file The login view.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 */

import React, { Dispatch, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import globalStyles from '../assets/global-styles'
import firebase from 'firebase'

const LoginView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function login ():void {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      props.authenticated(true)
    }).catch((error: Error) => {
      console.log(error)
      // TODO: Create an alert
    })
  }

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Image
          source={{ uri: require('../assets/login.png') }}
          style={style.image}
        />
        <View style={style.loginForm}>
          <Text style={globalStyles.titleText}>
            Login
          </Text>
          <TextInput
            style={[globalStyles.textInput, { marginTop: 20 }]}
            placeholder='Email'
            keyboardType='email-address'
            autoCompleteType='email'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[globalStyles.textInput, { marginTop: 10, marginBottom: 20 }]}
            placeholder='Password'
            keyboardType='visible-password'
            autoCompleteType='password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={globalStyles.button}
            onPress={login}
          >
            <Text style={globalStyles.buttonText}>
              Let's go
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: '100%'
  },
  content: {
    margin: 'auto'
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 30,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderRadius: 200 / 2
  },
  loginForm: {
    margin: 20
  }
})

export default LoginView
