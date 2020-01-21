import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const renderMessageList = () => (
    <View style={styles.content} />
  )

  const renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor} />
  )

  const renderToolbar = () => (
    <View style={styles.toolbar} />
  )

  return (
    <View style={styles.container}>
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: 'white'
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white'
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white'
  }
});
