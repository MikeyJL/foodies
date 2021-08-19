/**
 * @file The navigator component.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 */

import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather, FontAwesome } from '@expo/vector-icons'

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
    >
      <Tab.Screen
        name='feed'
        component={FeedView}
        options={{
          title: 'Feed',
          tabBarIcon: () => <Feather
            name='home'
            size={20}
            color='#050505'
          />
        }}
      />
      <Tab.Screen
        name='profile'
        children={() => <ProfileView authenticated={setAuthenticated} />}
        options={{
          title: 'Profile',
          tabBarIcon: () => <Feather
            name='user'
            size={20}
            color='#050505'
          />
        }}
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name='log-in'
        children={() => <LoginView authenticated={setAuthenticated} />}
        options={{
          title: 'Log in',
          tabBarIcon: () => <Feather
            name='key'
            size={20}
            color='#050505'
          />
        }}
      />
      <Tab.Screen
        name='register'
        component={RegisterView}
        options={{
          title: 'Register',
          tabBarIcon: () => <FontAwesome
            name='wpforms'
            size={20}
            color='#050505'
          />
        }}
      />
    </Tab.Navigator>
  )
}

export default Navigator