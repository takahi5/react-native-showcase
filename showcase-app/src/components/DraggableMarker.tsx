import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { LatLng, MapEvent, Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MarkerData } from "../types/markerData";

const DIALOG_HEIGHT = 40;
const MARKER_SIZE = 32;
const OFFSET_Y = (-1 * (DIALOG_HEIGHT + MARKER_SIZE)) / 2;

type Props = {
  latlng: LatLng;
  onPress: () => void;
  onDrag?: (event: MapEvent<{}>) => void;
};

export const DraggableMarker: React.FC<Props> = ({
  latlng,
  onPress,
  onDrag,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const onDragStart = () => {
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  return (
    <Marker
      coordinate={latlng}
      onPress={onPress}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      style={[styles.container, { opacity: dragging ? 0.6 : 1 }]}
    >
      <View style={styles.dialog}>
        <Text>タップで追加</Text>
        <Text>長押しで移動</Text>
      </View>

      <MaterialCommunityIcons
        name={"map-marker"}
        size={MARKER_SIZE}
        color="#f00"
        style={styles.marker}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: DIALOG_HEIGHT + MARKER_SIZE,
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: DIALOG_HEIGHT,
    top: OFFSET_Y,
  },
  marker: {
    position: "relative",
    top: OFFSET_Y,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});
