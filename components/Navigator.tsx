import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FeedView from '../views/FeedView'
import ProfileView from '../views/ProfileView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'

const Tab = createBottomTabNavigator()

const Navigator = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return authenticated ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      sceneContainerStyle={style.container}
    >
      <Tab.Screen
        name='feed'
        component={FeedView}
        options={{
          title: 'Feed'
        }}
      />
      <Tab.Screen
        name='profile'
        children={() => <ProfileView authenticated={setAuthenticated} />}
        options={{
          title: 'Profile'
        }}
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      sceneContainerStyle={style.container}
    >
      <Tab.Screen
        name='log-in'
        children={() => <LoginView authenticated={setAuthenticated} />}
        options={{
          title: 'Log in'
        }}
      />
      <Tab.Screen
        name='register'
        component={RegisterView}
        options={{
          title: 'Register'
        }}
      />
    </Tab.Navigator>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  }
})

export default Navigator