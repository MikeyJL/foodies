import React, { Dispatch } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import globalStyles from '../assets/global-styles'

const ProfileView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={style.image} />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => { props.authenticated(false) }}
        >
          <Text style={globalStyles.buttonText}>
            Log out
          </Text>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    marginBottom: 30,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderRadius: 200 / 2
  },
})

export default ProfileView
