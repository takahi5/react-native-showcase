import axios from "axios";
import admin = require("firebase-admin");
import { Restaurant } from "../types/restaurant";

const RESTAURANTS_API_URL = "https://omochikaeri.com/api/1.0/restaurants";

export const syncRestaurants = async () => {
  try {
    // APIでrestaurants取得
    const res = await axios.get(RESTAURANTS_API_URL);
    const restaurants = res.data.payload.restaurants;

    console.log("received restaurants:", restaurants.length);
    const db = admin.firestore();
    const restaurantsCollectionRef = db.collection("restaurants");
    let batch = db.batch();

    restaurants.forEach((restaurant: Restaurant) => {
      const { url, info, address, images, businessDay } = restaurant;
      batch.set(restaurantsCollectionRef.doc(restaurant.id), {
        source: "omochikaeri",
        url,
        info,
        address,
        images,
        businessDay,
      } as Restaurant);
    });
    batch.commit();
  } catch (error) {
    console.log(`Error!: ${error}`);
  }
};
