import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withTiming} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";

const ImageZoomScreen: React.FC = () => {
    const {imagePath} = useLocalSearchParams<{imagePath:string}>();
    const scale = useSharedValue(1);

    const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>
    ({
        onActive: (event) => {
            scale.value = event.scale;
        },
        onEnd: () => {
            scale.value = withTiming(1); //reset zoom smoothly
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}]
    }));

    return(
        <PinchGestureHandler onGestureEvent={onPinchGesture}>
            <Animated.View style={styles.mainContainer}>
                <Animated.Image 
                    source={{uri: imagePath}} 
                    style={[styles.image, animatedStyle]}/>
            </Animated.View>
        </PinchGestureHandler>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default ImageZoomScreen