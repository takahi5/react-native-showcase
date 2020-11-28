import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Constants from "expo-constants";
/* types */
import { Shop } from "../types/shop";
import { initialUser, User } from "../types/user";
import { Review } from "../types/review";
import { Restaurant } from "../types/restaurant";
import { LatLng } from "react-native-maps";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getRestaurants = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("restaurants")
      .limit(100)
      .get();
    const restaurants = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Restaurant)
    );
    return restaurants;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createRestaurant = async (name: string, latlng: LatLng) => {
  const restaurant = {
    source: "user-created",
    info: {
      name,
      ownerName: name,
      location: {
        lat: latlng.latitude,
        lng: latlng.longitude,
      },
    },
  } as Restaurant;
  try {
    const docRef = firebase.firestore().collection("restaurants").doc();
    await docRef.set(restaurant);
    return docRef.id;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const updateRestaurant = async (id: string, params: any) => {
  try {
    const docRef = firebase.firestore().collection("restaurants").doc(id);
    await docRef.update(params);
  } catch (err) {
    console.log(err);
  }
};

export const signin = async () => {
  const userCredintial = await firebase.auth().signInAnonymously();
  const { uid } = userCredintial.user;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
};

export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection("restaurants")
    .doc(shopId)
    .collection("reviews")
    .doc();
};

export const uploadImage = async (uri: string, path: string) => {
  // uriをblogに変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storageにupload
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(OverconstrainedError);
  }
  return downloadUrl;
};

export const getReviews = async (shopId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection("restaurants")
    .doc(shopId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};
