import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  Text,
} from "react-native";
import firebase from "firebase";
import {
  createReviewRef,
  uploadImage,
  createRestaurant,
  updateRestaurant,
} from "../lib/firebase";
import { pickImage } from "../lib/image-picker";
import { UserContext } from "../contexts/userContext";
import { ReviewsContext } from "../contexts/reviewsContext";
import { getExtension } from "../utils/file";
import { MarkersContext } from "../contexts/markersContext";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";
import { SmallMap } from "../components/SmallMap";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/review";
import { MarkerData } from "../types/markerData";
import { Restaurant } from "../types/restaurant";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { restaurant, latlng } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);
  const { markers, setMarkers } = useContext(MarkersContext);

  useEffect(() => {
    navigation.setOptions({
      title: restaurant ? restaurant.info.name : "新しいお店を登録する",
      headerLeft: () => (
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });

    if (restaurant) {
      setRestaurantName(restaurant.info.name);
    }
  }, [restaurant]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }

    setLoading(true);

    //
    // 座標指定がある場合は新規のrestaurant作成
    //
    let restaurantId;
    if (!!latlng) {
      restaurantId = await createRestaurant(restaurantName, latlng);
      console.log(restaurantId);
    } else {
      restaurantId = restaurant.id;
    }

    //
    // レビュー
    //

    // documentのIDを先に取得
    const reviewDocRef = await createReviewRef(restaurantId);
    // storageのpathを決定
    const ext = getExtension(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作る
    const review = {
      id: reviewDocRef.id,
      user: {
        name: user.name,
        id: user.id,
      },
      restaurant: {
        name: restaurantName,
        id: restaurantId,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    // レビュー一覧に即時反映する
    setReviews([review, ...reviews]);

    if (!!latlng) {
      // restaurantの画像をユーザー投稿画像で代用
      const images = {
        cover: downloadUrl,
        profile: downloadUrl,
      };
      await updateRestaurant(restaurantId, {
        images,
      });
      addMarker({
        id: restaurantId,
        source: "user-created",
        info: {
          name: restaurantName,
          ownerName: restaurantName,
          location: {
            lat: latlng.latitude,
            lng: latlng.longitude,
          },
        },
        images,
      } as Restaurant);
    }

    setLoading(false);
    navigation.goBack();
  };

  const addMarker = (restaurant: Restaurant) => {
    const newMarker = {
      type: "restaurant",
      latlng: {
        latitude: restaurant?.info?.location?.lat,
        longitude: restaurant?.info?.location?.lng,
      },
      restaurant,
      key: restaurant.id,
    } as MarkerData;
    setMarkers([...markers, newMarker]);
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!!latlng && (
          <View style={styles.restaurantContainer}>
            <Text style={styles.title}>お店の情報</Text>
            <Form
              value={restaurantName}
              onChangeText={(text) => {
                setRestaurantName(text);
              }}
              label="お店の名前"
            />
            <View style={{ alignItems: "center" }}>
              <SmallMap latlng={latlng} />
            </View>
          </View>
        )}
        <Text style={styles.title}>レビュー</Text>
        <StarInput score={score} onChangeScore={(value) => setScore(value)} />
        <TextArea
          value={text}
          onChangeText={(value) => setText(value)}
          label="コメント"
          placeholder="美味しかったです。また利用したいです。"
        />
        <View style={styles.photoContainer}>
          <IconButton name="camera" onPress={onPickImage} color="#ccc" />
          {!!imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
        <Button text="投稿する" onPress={onSubmit} />
      </ScrollView>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  restaurantContainer: {
    marginTop: 16,
    marginBottom: 48,
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
  line: {
    borderTopWidth: 1,
    borderColor: "gray",
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
  },
});
