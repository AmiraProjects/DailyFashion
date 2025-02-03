import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, FC} from 'react'
import { categoryList, imageSlider } from '@/data/Data'
import {ImageSlider} from 'react-native-image-slider-banner'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Product } from '@/store/realm/ProductSchema'
import realm from '@/store/realm'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen-hooks'

const Index: FC = () => {
  const router = useRouter();

  const handleIconPress = (categoryId: number) => {
    //get all product from realm
    const products = realm.objects<Product>("Product").filtered(`category = ${categoryId}`)
    //console.log(products)
    router.push({
      pathname: '/ShowProductScreen',
      params: {products: JSON.stringify(Array.from(products))}
    })
  }

  return (
    <View
      style={styles.mainContainer}
    >
      <ImageSlider
      data={imageSlider}
      caroselImageStyle={{resizeMode: 'cover', height: hp('30%')}}
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
            <TouchableOpacity style={styles.button} onPress={() => handleIconPress(item.id)}>
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
    fontSize: hp('2.5%'),
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
    height: hp('17%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: wp('20%'),
    height: hp('12%'),
    resizeMode: 'contain'
  },
  itemName: {
    color: 'black'
  }
})

export default Index
