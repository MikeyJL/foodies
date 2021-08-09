import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Navigator from './components/Navigator'
import firebase from 'firebase'

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAoVpRWdPczUQSj4sc93aNzGAhfLxeoW8w',
    authDomain: 'foodies-react-native-expo.firebaseapp.com',
    projectId: 'foodies-react-native-expo',
    storageBucket: 'foodies-react-native-expo.appspot.com',
    messagingSenderId: '685724378052',
    appId: '1:685724378052:web:fbf3c11c73dd2690927a91'
  }
  firebase.initializeApp(firebaseConfig)
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}

export default App
