import { LatLng } from "react-native-maps";
import { Restaurant } from "./restaurant";
import { Shop } from "./shop";

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Map: undefined;
  Restaurant: { restaurant: Restaurant };
  User: undefined;
  Search: undefined;
  CreateReview: { restaurant?: Restaurant; latlng?: LatLng };
};
