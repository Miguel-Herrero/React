import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default function SearchInput({ placeholder, onSubmit }) {
  const [text, setText] = useState("")

  const handleChangeText = (newLocation) => setText(newLocation)

  const handleSubmitEditing = () => {
    if (!text) return

    onSubmit(text)
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    minWidth: 300,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: 'white',
  }
});
