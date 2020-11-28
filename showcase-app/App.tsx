import React, { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext } from "./src/contexts/userContext";
import { ReviewsContext } from "./src/contexts/reviewsContext";
import { MarkersContext } from "./src/contexts/markersContext";
import { User } from "./src/types/user";
import { Review } from "./src/types/review";
import { MarkerData } from "./src/types/markerData";

export default function App() {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <MarkersContext.Provider value={{ markers, setMarkers }}>
          <AppNavigator />
        </MarkersContext.Provider>
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
}
