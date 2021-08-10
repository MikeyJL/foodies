import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyles from '../assets/global-styles'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'
import PostList from '../components/PostList'
import { Feather } from '@expo/vector-icons'

const FeedView = () => {
  const [init, setInit] = useState(false)
  const [posts, setPosts] = useState(null as any)
  const [showPosts, setShowPosts] = useState(false)
  const [creating, setCreating] = useState(false)
  const [image, setImage] = useState(null as any)
  const [caption, setCaption] = useState('')

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
      firebase.firestore().collection('posts').get().then((snapshot) => {
        if (snapshot.docs.length !== 0) {
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
      setImage(result)
      setCreating(true)
    }
  }

  const createPost = async () => {
    if (image !== null) {
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
        xhr.open('GET', image.uri, true)
        xhr.send(null)
      })

      const UUID = uuidv4()
      const ref = firebase.storage().ref('posts').child(UUID).put(blob as any)

      ref.on('state_changed',
        (snapshot) => {
          console.log(snapshot)
        },
        (error: Error) => {
          console.log(error)
          // TODO: Better logging
        },
        () => {
          const DATE = new Date()
          const DD = DATE.getDate()
          const MM = DATE.getMonth()
          const YY = DATE.getFullYear()
          const NEW_DATE = `${DD} ${MM} ${YY}`
          ref.snapshot.ref.getDownloadURL().then(async (url) => {
            firebase.firestore().collection('posts').add({
              email: await firebase.auth().currentUser?.email,
              imageUrl: url,
              imageId: UUID,
              caption,
              createdAt: NEW_DATE
            }).catch((error: Error) => {
              console.log(error)
              // TODO: better logging
            })
          })
        }
      )
      setCreating(false)
      setImage(null)
      setCaption('')
    } else {
      console.log('Please select an image')
    }
  }

  return creating ? (
    <ScrollView style={[globalStyles.container, { marginVertical: 'auto' }]}>
      <View>
        <Image
          source={image}
          resizeMode='contain'
          style={style.imageHolder}
        />
        <TextInput
          style={style.captionInput}
          placeholder='Caption'
          keyboardType='default'
          multiline={true}
          value={caption}
          onChangeText={setCaption}
        />
      </View>
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: 'green', marginBottom: 10 }]}
        onPress={createPost}
      >
        <Text style={globalStyles.buttonText}>
          Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => { setCreating(false) }}
      >
        <Text style={globalStyles.buttonText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </ScrollView>
  ) : (
    <ScrollView style={globalStyles.container}>
      <TouchableOpacity
        style={style.createIcon}
        onPress={pickImage}
      >
        <Feather
          name='plus-circle'
          size={24}
          color='#050505'
        />
      </TouchableOpacity>
      <PostList
        posts={posts}
        show={showPosts}
        setShow={setShowPosts}
      />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  createIcon: {
    marginTop: 20,
    marginLeft: 'auto'
  },
  imageHolder: {
    backgroundColor: 'white',
    height: '30vh',
    width: '80vw',
    borderRadius: 15
  },
  iconSelectImage: {
    margin: 'auto'
  },
  captionInput: {
    fontSize: 16,
    height: '30vh',
    padding: 10,
    marginVertical: 20
  }
})

export default FeedView
