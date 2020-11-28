import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
};

export const Button: React.FC<Props> = ({ onPress, text }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0097a7",
    height: 50,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
