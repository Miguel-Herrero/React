import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'

import { getImageFromId } from '../utils/api'
import Card from './Card'

export default function CardList({ items }) {
    const keyExtractor = ({ id }) => id.toString()
    const renderItem = ({ item: {id, author}}) => (
      <Card
        fullName={author}
        image={{
          uri: getImageFromId(id)
        }}
      />
    )

    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    )
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    })
  )
}