import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  GestureResponderEvent,
} from "react-native";
import Svg, { Polyline, Rect } from "react-native-svg";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export type Point = {
  x: number;
  y: number;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Paint">;
  route: RouteProp<RootStackParamList, "Paint">;
};

export const PaintScreen: React.FC<Props> = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [pointsList, setPointsList] = useState<Point[][]>([]);

  const toPointsString = (points: Point[]) =>
    points.map((point) => `${point.x},${point.y}`).join(" ");

  const onTouchMove = (event: GestureResponderEvent) => {
    const { locationX, locationY, touches } = event.nativeEvent;
    if (touches.length === 1) {
      // 描画中の線分の情報を追加する
      setPoints([...points, { x: locationX, y: locationY }]);
    }
  };

  const onTouchEnd = () => {
    if (points.length > 0) {
      // 描画中の線分の情報をクリア
      setPointsList([...pointsList, points]);
      setPoints([]);
    }
  };

  const onTouchCancel = () => {
    if (points.length > 0) {
      setPoints([]);
    }
  };

  return (
    <View
      style={styles.container}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        {/* 背景 */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="#000"
          strokeWidth="1"
          fill="#fff"
        />
        {/* 描画中の線 */}
        <Polyline
          points={toPointsString(points)}
          fill="none"
          stroke="#ccc"
          strokeWidth="3"
        />
        {pointsList.map((_points) => (
          <Polyline
            points={toPointsString(_points)}
            fill="none"
            stroke="#000"
            strokeWidth="3"
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
