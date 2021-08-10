import React, { Dispatch, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import globalStyles from '../assets/global-styles'
import firebase from 'firebase';

const ProfileView = (props: { authenticated: Dispatch<React.SetStateAction<boolean>> }) => {
  const [posts, setPosts] = useState(null as any)
  const [showPosts, setShowPosts] = useState(false)

  useEffect(() => {
    const email = firebase.auth().currentUser?.email
    firebase.firestore().collection('posts').where('userEmail', '==', email).get().then((snapshot) => {
      if (posts === null) {
        const arr: Array<{ id: string, email: string, image: string, caption: string }> = []
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            email: doc.data().userEmail,
            image: doc.data().imageUrl,
            caption: doc.data().caption
          }
          arr.push(data)
        })
        setPosts(arr)
        setShowPosts(true)
      }
    })
  })

  const postList = (): JSX.Element => {
    if (showPosts) {
      return posts.map((post: any) => (
        <View key={post.id}>
          <Image
            style={style.postImage}
            source={{ uri: post.image }}
          />
          <Text>
            {post.caption}
          </Text>
        </View>
      )
    )
    } else {
      return (
        <Text>
          No posts yet
        </Text>
      )
    }
  }

  return (
    <View>
        <View style={style.image} />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            firebase.auth().signOut(),
            props.authenticated(false)
          }}
        >
          <Text style={globalStyles.buttonText}>
            Log out
          </Text>
        </TouchableOpacity>
        <View>
          {postList()}
        </View>
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
  post: {
    borderRadius: 15,
    marginTop: 20
  },
  postImage: {
    height: '200px',
    width: '100%',
  },
  postText: {
    padding: 10,
    backgroundColor: 'white'
  }
})

export default ProfileView
