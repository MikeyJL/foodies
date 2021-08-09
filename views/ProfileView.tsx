import React, { Dispatch } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import globalStyles from '../assets/global-styles'

const ProfileView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
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

export default ProfileView
