import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import AuthorRow from './AuthorRow';

export default function Card({ fullName, image, linkText, onPressLinkText }) {
  return (
    <View>
      <AuthorRow
        fullName={fullName}
        linkText={linkText}
        onPressLinkText={onPressLinkText}
      />

      <Image style={styles.image} source={image} />
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