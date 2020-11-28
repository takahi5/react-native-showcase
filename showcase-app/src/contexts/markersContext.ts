import { createContext } from "react";
import { MarkerData } from "../types/markerData";
import { Review } from "../types/review";

type MarkersContextValue = {
  markers: MarkerData[];
  setMarkers: (markers: MarkerData[]) => void;
};

export const MarkersContext = createContext<MarkersContextValue>({
  markers: [],
  setMarkers: () => {},
});
