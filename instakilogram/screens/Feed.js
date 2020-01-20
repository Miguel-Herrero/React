import React, { useState, useEffect } from 'react'
import { ViewPropTypes, ActivityIndicator, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'

import { fetchImages } from '../utils/api'
import CardList from '../components/CardList'

export default function Feed({ style }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await fetchImages()
    
        setIsLoading(false)
        setItems(items)
      } catch (error) {
        setIsLoading(false)
        setHasError(true)
      }
    }
    fetchData();
  }, [setItems])

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  if (hasError) {
    return <Text>Error…</Text>
  }

  return (
    <SafeAreaView style={style}>
      <CardList items={items} />
    </SafeAreaView>
  )
}

Feed.propTypes = {
  style: ViewPropTypes.style
}

Feed.defaultProps = {
  style: null
}