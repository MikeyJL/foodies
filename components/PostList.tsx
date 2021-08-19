/**
 * @file The post list component.
 * @author Mikey Lau
 * {@link https//mikeylau.uk|Portfolio}
 * {@link https://github.com/MikeyJL|Github}
 */

import React, { Dispatch, SetStateAction } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const PostList = (props: {
    posts: any,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
  }): JSX.Element => {
  if (props.show) {
    return props.posts.length !== 0 ? (props.posts.map((post: any) => (
      <View
        key={post.id}
        style={style.post}
      >
        <Image
          style={style.postImage}
          source={{ uri: post.image }}
        />
        <View style={style.postText}>
          <Text>
            {post.caption}
          </Text>
          <View style={style.postMeta}>
            <Text style={style.postMetaEmail}>
              {post.email}
            </Text>
            <Text style={style.postMetaDate}>
              {post.date}
            </Text>
          </View>
        </View>
      </View>
    ))) : (
      <View>
        <Text>
          No posts yet
        </Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text>
          No posts yet
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  post: {
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'white'
  },
  postImage: {
    height: '200px',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  postText: {
    padding: 15,
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    backgroundColor: 'white'
  },
  postMeta: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  postMetaEmail: {
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 12
  },
  postMetaDate: {
    fontWeight: 'bold',
    fontSize: 12
  }
})

export default PostList
