import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { categoryList, imageSlider } from '@/data/Data'
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
      
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Categories</Text>
      </View>

      <FlatList
        data={categoryList}
        key={3}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style={styles.button}>
              <Image
              source={{uri: item.icon}}
              style={styles.icon}/>

              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  titleContainer: {
    marginTop: 2,
    alignItems: 'center'
  },
  flatListContainer: {
    padding: 8
  },
  button: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  itemName: {
    color: 'black'
  }
})

export default Index
