import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { imageSlider } from '@/data/data'
import {ImageSlider} from 'react-native-image-slider-banner'
import { Image } from 'react-native'

const Index: React.FC = () => {
  return (
    <View
      style={styles.mainContainer}
    >
      <ImageSlider
      data={imageSlider}
      caroselImageStyle={{resizeMode: 'cover', height: 210}}
      autoPlay={true}
      closeIconColor='#fff'/>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})

export default Index
