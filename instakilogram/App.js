import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import Card from './components/Card';

export default function App() {
  return (
    <View style={styles.container}>
      <Card
        fullName={'John Dow'}
        image={{ uri: 'https://unsplash.it/600/600' }}
        linkText={'Comments'}
        onPressLinkText={() => {
          console.log('Pressed link!')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff'
  }
});
