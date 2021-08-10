import React, { Dispatch, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid'
import PostList from '../components/PostList';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }) => {
  const [init, setInit] = useState(false)
  const [posts, setPosts] = useState(null as any)
  const [showPosts, setShowPosts] = useState(false)
  const [showProfileImage, setShowProfileImage] = useState(false)
  const [profileImage, setProfileImage] = useState(null as any)
  const email = firebase.auth().currentUser?.email

  useEffect(() => {
    if (!init) {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
          if (status !== 'granted') {
            alert('In order to post, you need to give us permission to use your photo library')
          }
        }
      })
      firebase.firestore().collection('posts').where('email', '==', email).get().then((snapshot) => {
        if (posts === null) {
          const arr: Array<{ id: string, email: string, image: string, caption: string }> = []
          snapshot.docs.forEach((doc) => {
            const data = {
              id: doc.id,
              email: doc.data().email,
              image: doc.data().imageUrl,
              caption: doc.data().caption,
              date: doc.data().createdAt
            }
            arr.push(data)
          })
          setPosts(arr)
          setShowPosts(true)
        }
      })
      firebase.firestore().collection('users').doc(email as string).get().then((snapshot) => {
        const DATA: firebase.firestore.DocumentData | boolean = snapshot.data() || false
        if (snapshot.exists && DATA) {
          const IMAGE: string | boolean = DATA.profileImage || false
          if (IMAGE) {
            setProfileImage(IMAGE)
            setShowProfileImage(true)
          }
        }
      })
      setInit(true)
    }
  })

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled) {
      const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function (error: any) {
          console.log(error)
          reject(new TypeError('Failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', result.uri, true)
        xhr.send(null)
      })

      const UUID = uuidv4()
      const ref = firebase.storage().ref('users').child(UUID).put(blob as any)

      ref.on('state_changed',
        (snapshot) => {
          console.log(snapshot)
        },
        (error: Error) => {
          console.log(error)
          // TODO: Better logging
        },
        () => {
          ref.snapshot.ref.getDownloadURL().then(async (url) => {
            firebase.firestore().collection('users').doc(email as string).set({
              email: firebase.auth().currentUser?.email,
              profileImage: url
            }).catch((error: Error) => {
              console.log(error)
              // TODO: better logging
            })
            setProfileImage(url)
            setShowProfileImage(true)
          })
        }
      )
    }
  }

  const ProfileImageComponent = (): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={pickImage}
      >
        <Image
          style={style.image}
          source={showProfileImage ? profileImage : ''}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <View style={style.header}>
        <ProfileImageComponent />
        <TouchableOpacity
          style={style.logoutIcon}
          onPress={() => {
            firebase.auth().signOut(),
            props.authenticated(false)
          }}
        >
          <MaterialIcons
            name='logout'
            size={24}
            color='#050505'
          />
        </TouchableOpacity>
      </View>
      <PostList
        posts={posts}
        show={showPosts}
        setShow={setShowPosts}
      />
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40
  },
  logoutIcon: {
    marginLeft: 'auto'
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 30,
    marginRight: 'auto',
    backgroundColor: 'white',
    borderRadius: 120 / 2
  }
})

export default ProfileView
