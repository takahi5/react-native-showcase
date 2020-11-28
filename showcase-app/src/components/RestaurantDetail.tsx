import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
/* components */
import { Stars } from "./Stars";
/* types */
import { Restaurant } from "../types/restaurant";

type Props = {
  restaurant: Restaurant;
};

export const RestaurantDetail: React.FC<Props> = ({ restaurant }: Props) => {
  const { info, images, address } = restaurant;

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {!!images?.cover && (
          <Image style={styles.image} source={{ uri: images.cover }} />
        )}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        />
        <View style={styles.nameContainer}>
          {info && <Text style={styles.name}>{info.name}</Text>}
          {address && (
            <Text
              style={styles.place}
            >{`${address.state} ${address.city}`}</Text>
          )}
        </View>
      </View>
      {/*
      <View style={styles.starContainer}>
        <Stars score={score} starSize={28} textSize={20} />
      </View>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  nameContainer: {
    position: "absolute",
    left: 16,
    bottom: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  starContainer: {
    margin: 16,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  name: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  place: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
});
