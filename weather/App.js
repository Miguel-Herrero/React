import React from 'react';
import { StyleSheet, Text, Platform, KeyboardAvoidingView, ImageBackground, View } from 'react-native';
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather'

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={getImageForWeather('Light Cloud')}
        style={styles.imageContainer}
        imageStyle={styles.image}>

        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>San Francisco</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24 ºC</Text>

          <SearchInput placeholder="Search any city" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
});
