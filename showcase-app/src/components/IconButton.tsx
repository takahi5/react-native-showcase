import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  color?: string;
  icon?: "feather" | "material";
};

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = "#000",
  icon = "feather",
}: Props) => {
  const Icon = icon === "material" ? MaterialIcons : Feather;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
