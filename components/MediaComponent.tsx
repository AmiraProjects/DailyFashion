import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React, {FC} from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen-hooks'

interface IMediaComponent {
    value: string //text to display
    imageSource: ImageSourcePropType
    onPress?: () => void; //optional press handler
}

export const MediaComponent: FC<IMediaComponent> = ({value, imageSource, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={imageSource}/>
        <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    image: {
        width: wp('5%'),
        height: wp('5%')
    },
    text: {
        fontSize: hp('1.8%'),
        marginLeft: 8
    }
})