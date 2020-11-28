import React from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { View, StyleSheet } from "react-native";

type Props = {
  latlng: LatLng;
};

export const SmallMap: React.FC<Props> = ({ latlng }) => {
  const { latitude, longitude } = latlng;
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.00005,
        longitudeDelta: 0.00005,
      }}
    >
      <Marker coordinate={latlng} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
  },
});
