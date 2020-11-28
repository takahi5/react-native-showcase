import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationData>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return { location };
};
