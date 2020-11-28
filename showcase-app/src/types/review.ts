import * as firebase from "firebase";

type UserRef = {
  id: string;
  name: string;
};

type RestaurantRef = {
  id: string;
  name: string;
};

export type Review = {
  id?: string;
  text: string;
  score: number;
  imageUrl: string;
  user: UserRef;
  restaurant: RestaurantRef;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
};
