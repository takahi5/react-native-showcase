import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Linking,
} from "react-native";
import { getReviews } from "../lib/firebase";
import { ReviewsContext } from "../contexts/reviewsContext";
/* components */
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ReviewItem } from "../components/ReviewItem";
import { RestaurantDetail } from "../components/RestaurantDetail";
/* types */
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { OmochikaeriButton } from "../components/OmochikaeriButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Restaurant">;
  route: RouteProp<RootStackParamList, "Restaurant">;
};

export const RestaurantScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { restaurant } = route.params;
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({ title: restaurant.info.name });

    const fetchReviews = async () => {
      const reviews = await getReviews(restaurant.id);
      setReviews(reviews);
    };
    fetchReviews();
  }, [restaurant]);

  const onPressOmochikaeri = () => {
    if (restaurant.url) {
      Linking.openURL(restaurant.url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<RestaurantDetail restaurant={restaurant} />}
      />
      {restaurant.source === "omochikaeri" && (
        <View style={styles.footerButtonContainer}>
          <OmochikaeriButton onPress={onPressOmochikaeri} />
        </View>
      )}
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("CreateReview", { restaurant })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
});
