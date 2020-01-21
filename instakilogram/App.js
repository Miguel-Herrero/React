import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Platform, Modal } from 'react-native';
import Constants from 'expo-constants';

import Feed from './screens/Feed';
import Comments from './screens/Comments';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const openCommentScreen = id => {
    setSelectedItemId(id)
    setShowModal(true)
  }

  const closeCommentScreen = () => {
    setShowModal(false)
    setSelectedItemId(null)
  }

  const onSubmitComment = (text) => {
    const comments = commentsForItem[selectedItemId] || []

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text]
    }

    setCommentsForItem(updated)

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.log('Failed to save comment', text, 'for', selectedItemId)
    }
  }

  useEffect(( )=> {
    async function fetchData() {
      try {
        const commentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY)

        setCommentsForItem(commentsForItem ? JSON.parse(commentsForItem) : {})
      } catch (error) {
        console.log('Failed to load comments')
      }
    }

    fetchData();
  }, [setSelectedItemId])

  return (
    <View style={styles.container}>
      <Feed
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComments={openCommentScreen}
      />

      <Modal
        visible={showModal}
        animationType='slide'
        onRequestClose={closeCommentScreen}
      >
        <Comments
          style={styles.comments}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentScreen}
          onSubmitComment={onSubmitComment}
        />
      </Modal>
    </View>
  );
}

const platformVersion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});
