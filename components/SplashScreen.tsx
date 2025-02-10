import React, { FC, useEffect } from "react";
import { View, ImageBackground, Image, StyleSheet } from "react-native";

interface SplashScreenProps {
  onTransition: () => void; //callback to handle transition
}

const SplashScreen: FC<SplashScreenProps> = ({ onTransition }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTransition(); //trigger transition by callback
    }, 3000);

    return () => clearTimeout(timer);
  }, [onTransition]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/images/splash.png")}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/splash-text.png")}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
