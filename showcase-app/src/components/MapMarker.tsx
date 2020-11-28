import React from "react";
//import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MarkerData } from "../types/markerData";

type Props = {
  marker: MarkerData;
  selected: boolean;
  onPressMarker: (marker: MarkerData) => void;
};

export const MapMarker: React.FC<Props> = ({
  marker,
  selected,
  onPressMarker,
}) => {
  return (
    <Marker
      coordinate={marker.latlng}
      key={marker.key}
      onPress={() => onPressMarker(marker)}
    >
      <MaterialCommunityIcons
        name={selected ? "map-marker-radius" : "map-marker"}
        size={32}
        color={
          marker.restaurant?.source === "user-created" ? "#636e72" : "#ff7675"
        }
      />
    </Marker>
  );
};

//const styles = StyleSheet.create({
//  container: {}
//});
