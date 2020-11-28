import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Alert,
} from "react-native";
import MapView, { LatLng, MapEvent, Marker, Region } from "react-native-maps";
import { getRestaurants } from "../lib/firebase";
import { MarkersContext } from "../contexts/markersContext";
/* hooks */
import { useLocation } from "../hooks/use-location";
/* components */
import { MapModal } from "../components/MapModal";
import { MapMarker } from "../components/MapMarker";
import { DraggableMarker } from "../components/DraggableMarker";
import { IconButton } from "../components/IconButton";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Restaurant } from "../types/restaurant";
import { MarkerData } from "../types/markerData";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Map">;
  route: RouteProp<RootStackParamList, "Map">;
};

export const MapScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const { markers, setMarkers } = useContext(MarkersContext);
  const { location } = useLocation();

  const selectedLatLang = useRef<LatLng>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const restaurants = await getRestaurants();
    let markers = restaurants.map(
      (restaurant) =>
        ({
          type: "restaurant",
          latlng: {
            latitude: restaurant?.info?.location?.lat,
            longitude: restaurant?.info?.location?.lng,
          },
          restaurant,
          key: restaurant.id,
        } as MarkerData)
    );
    setMarkers(markers);
  };

  const onPressMarker = (marker: MarkerData) => {
    setSelectedRestaurant(marker.restaurant);
    console.log(location);
  };

  const onRegionChange = (region: Region) => {
    const { latitude, longitude } = region;
    console.log("onRegionChange", region);
    selectedLatLang.current = { latitude, longitude };
  };

  const onPressDraggableMarker = () => {
    console.log(selectedLatLang.current);
    const { latitude, longitude } = selectedLatLang.current;
    Alert.alert("お店の追加", "この場所にお持ち帰りのお店情報を追加しますか?", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("CreateReview", {
            latlng: {
              latitude,
              longitude,
            },
          }),
      },
    ]);
  };

  const onPressMapModal = () => {
    if (!selectedRestaurant) return;
    navigation.navigate("Restaurant", { restaurant: selectedRestaurant });
  };

  const onPressGps = () => {
    if (!location) return;
    const { coords } = location;
    const { latitude, longitude } = coords;
    console.log(latitude, longitude);

    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    });
  };

  const onDragMarker = (event: MapEvent<{}>) => {
    const { coordinate } = event.nativeEvent;
    //const {latitude, longitude} = coordinate;
    selectedLatLang.current = coordinate;
  };

  const renderMarker = (marker: MarkerData) => {
    const selected =
      selectedRestaurant && selectedRestaurant.id === marker.restaurant.id;
    return (
      <MapMarker
        marker={marker}
        selected={selected}
        onPressMarker={onPressMarker}
        key={marker.key}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapStyle}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 34.67890149350161,
          longitude: 135.5065959655613,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        region={currentRegion}
      >
        {markers.map((marker) => renderMarker(marker))}
        <DraggableMarker
          latlng={{ latitude: 34.6689012935016, longitude: 135.5065959655 }}
          onPress={onPressDraggableMarker}
          onDrag={onDragMarker}
        />
      </MapView>
      <View style={styles.gpsContainer}>
        <IconButton
          name="gps-fixed"
          icon="material"
          onPress={onPressGps}
          color="#888"
        />
      </View>
      <MapModal
        visible={!!selectedRestaurant}
        restaurant={selectedRestaurant}
        onPress={onPressMapModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  gpsContainer: {
    position: "absolute",
    right: 16,
    bottom: 150,
  },
});
