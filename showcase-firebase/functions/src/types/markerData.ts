import { LatLng } from "react-native-maps";
import { Restaurant } from "./restaurant";

export type MarkerData = {
  latlng: LatLng;
  restaurant?: Restaurant;
  type: "restaurant" | "region";
  key: string;
};
