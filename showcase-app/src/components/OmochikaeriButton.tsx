import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

type Props = {
  onPress: () => void;
};

export const OmochikaeriButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require("../assets/images/omochikaeri-logo-white.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>で注文</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FBC02D",
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#fff",
  },
  logo: {
    width: 200,
    height: 40,
  },
});
