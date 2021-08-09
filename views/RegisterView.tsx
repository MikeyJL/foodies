import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import globalStyles from '../assets/global-styles'

const RegisterView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.imagePlaceholder} />
        <View style={style.registerForm}>
          <Text style={globalStyles.titleText}>
            Register
          </Text>
          <TextInput
            style={[globalStyles.textInput, { marginTop: 20 }]}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[globalStyles.textInput, { marginTop: 10 }]}
            placeholder='Password'
            keyboardType='visible-password'
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={[globalStyles.textInput, { marginTop: 10, marginBottom: 20 }]}
            placeholder='Confirm password'
            keyboardType='visible-password'
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => {}}
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
  imagePlaceholder: {
    height: 150,
    width: 150,
    marginBottom: 30,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderRadius: 150 / 2
  },
  registerForm: {
    margin: 20
  }
})

export default RegisterView
