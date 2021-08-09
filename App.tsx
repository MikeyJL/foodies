import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Navigator from './components/Navigator'
import firebase from 'firebase'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'

const App = () => {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  }
  firebase.initializeApp(firebaseConfig)
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}

export default App
