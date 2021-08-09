import React, { Dispatch, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import globalStyles from '../assets/global-styles'

const LoginView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.imagePlaceholder} />
        <View style={style.loginForm}>
          <Text style={globalStyles.titleText}>
            Login
          </Text>
          <TextInput
            style={[globalStyles.textInput, { marginTop: 20 }]}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[globalStyles.textInput, { marginTop: 10, marginBottom: 20 }]}
            placeholder='Password'
            keyboardType='visible-password'
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => { props.authenticated(true) }}
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
  imagePlaceholder: {
    height: 150,
    width: 150,
    marginBottom: 30,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderRadius: 150 / 2
  },
  loginForm: {
    margin: 20
  }
})

export default LoginView
