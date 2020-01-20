import React, { useState } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

export default function CommentInput({ onSubmit, placeholder }) {
  const [text, setText] = useState('')

  const handleChangeText = (text) => {
    setText(text)
  }

  const handleSubmitEditing = () => {
    if (!text) return

    onSubmit(text)
    setText('')
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  )
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

CommentInput.defaultProps = {
  placeholder: ''
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    height: 60
  },
  input: {
    flex: 1
  }
})