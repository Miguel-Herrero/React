import React, { useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import AuthorRow from './AuthorRow';

function Card({ fullName, image, linkText, onPressLinkText }) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <View>
      <AuthorRow
        fullName={fullName}
        linkText={linkText}
        onPressLinkText={onPressLinkText}
      />

      <View style={styles.image}>
        {isLoading && (
          <ActivityIndicator style={StyleSheet.absoluteFill} size='large' />
        )}
        <Image style={styles.image} source={image} onLoad={handleLoad} />

      </View>
    </View>
  )
}

Card.propTypes = {
    fullName: PropTypes.string.isRequired,
    image: Image.propTypes.source.isRequired,
    linkText: PropTypes.string,
    onPressLinkText: PropTypes.func
}

Card.defaultProps = {
    linkText: '',
    onPressLinkText: () => {}
}

const styles = StyleSheet.create({
    image: {
      aspectRatio: 1,
      backgroundColor: 'rgba(0,0,0,0.02)'
    }
})

export default React.memo(Card)