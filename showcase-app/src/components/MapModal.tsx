import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Tag } from "./Tag";
/* types */
import { Restaurant } from "../types/restaurant";

type Props = {
  visible: boolean;
  restaurant: Restaurant;
  onPress: () => void;
};

export const MapModal: React.FC<Props> = ({ visible, restaurant, onPress }) => {
  if (!visible) return null;

  const { url, info, address, images, source } = restaurant;
  const isUserCreated = source === "user-created";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.modal}>
        <View style={styles.imageContainer}>
          {images?.cover ? (
            <Image source={{ uri: images.cover }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.emptyImage]}>
              <MaterialIcons name="restaurant" size={32} color="#fff" />
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 2,
            }}
          >
            <Tag
              color={isUserCreated ? "#666" : "#fbc02d"}
              text={isUserCreated ? "ユーザー投稿" : "おもちかえり.com"}
            />
          </View>
          {!!info && (
            <>
              <Text style={styles.mainText} numberOfLines={1}>
                {info.name}{" "}
              </Text>
              <Text style={styles.subText} numberOfLines={2}>
                {info.introduction}{" "}
              </Text>
            </>
          )}
          {!!address && (
            <>
              <Text style={[styles.subText, styles.gray]} numberOfLines={1}>
                {`${address.state} ${address.city}`}
              </Text>
            </>
          )}
        </View>
        <View style={styles.iconContainer}>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 160,
    bottom: 0,
    position: "absolute",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    marginRight: 8,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  emptyImage: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  gray: {
    color: "gray",
  },
});
