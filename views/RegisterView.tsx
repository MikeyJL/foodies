/**
 * @file The register view.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 */

import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import globalStyles from '../assets/global-styles'
import firebase from 'firebase'

/**
 * @param {Dispatch<SetStateAction<boolean>>} props.authenticated - Whether the user is authenticated or not.
 * @returns {JSX.Element} - The register view element.
 */
const RegisterView = (props: { authenticated: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  /**
   * Registers a new user on firebase auth.
   */
  function register ():void {
    if (password === confirm) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          props.authenticated(true)
        }).catch((error: Error) => {
          console.log(error)
          // TODO: Create an alert
        })
      }).catch((error: Error) => {
        console.log(error)
        // TODO: Create an alert
      })
    } else {
      console.log('Password does not match ')
      // TODO: Create an alert
    }
  }

  /**
   * The JSX Element.
   */
  return (
    <View style={style.container}>
      <View style={style.content}>
        <Image
          source={{ uri: require('../assets/register.png') }}
          style={style.image}
        />
        <View style={style.registerForm}>
          <Text style={globalStyles.titleText}>
            Register
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
            style={[globalStyles.textInput, { marginTop: 10 }]}
            placeholder='Password'
            keyboardType='visible-password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={[globalStyles.textInput, { marginTop: 10, marginBottom: 20 }]}
            placeholder='Confirm password'
            keyboardType='visible-password'
            secureTextEntry={true}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity
            style={globalStyles.button}
            onPress={register}
          >
            <Text style={globalStyles.buttonText}>
              Sign up
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
  registerForm: {
    margin: 20
  }
})

export default RegisterView
