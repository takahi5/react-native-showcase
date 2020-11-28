import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { syncRestaurants } from "./lib/omochikaeri";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

//export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!!!!");
//});

export const syncOmochikaeri = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 14 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    syncRestaurants();
  });
