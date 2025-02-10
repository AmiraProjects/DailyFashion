import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen-hooks";

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  color: string;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: color,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
  },
});
