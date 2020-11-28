import React from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {
  color: string;
  text: string;
};
export const Tag: React.FC<Props> = ({ color = "#000", text = "tag" }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});
