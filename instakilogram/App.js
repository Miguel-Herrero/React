import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Modal } from 'react-native';
import Constants from 'expo-constants';

import Feed from './screens/Feed';
import Comments from './screens/Comments'

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
