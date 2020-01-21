import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Platform, KeyboardAvoidingView, ImageBackground, View, StatusBar, ActivityIndicator } from 'react-native';

import SearchInput from './components/SearchInput'

import getImageForWeather from './utils/getImageForWeather'
import { fetchLocationId, fetchWeather } from './utils/api'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [temperature, setTemperature] = useState(0)
  const [weather, setWeather] = useState('')
  const [location, setLocation] = useState('San Francisco')

  const handleUpdateLocation = async (city) => {
    setIsLoading(true)
    setHasError(false)

    try {
      const locationId = await fetchLocationId(city)
      const { location, weather, temperature } = await fetchWeather(locationId)

      setIsLoading(false)
      setWeather(weather)
      setTemperature(temperature)
      setLocation(location)
    } catch (error) {
      setIsLoading(false)
      setHasError(true)
    }
  }

  useEffect(() => {
    // Fetch weather when component is first rendered (`setLocation` is fired) and `location` is updated
    handleUpdateLocation(location)
  }, [location, setLocation])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <StatusBar barStyle='light-content' />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>

        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={isLoading} color='white' size='large' />

          {!isLoading && (
            <>
              {hasError && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!hasError && (
                <>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)} ºC`}</Text>
                </>
              )}

              <SearchInput placeholder='Search any city' onSubmit={handleUpdateLocation} />
            </>
          )}
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
