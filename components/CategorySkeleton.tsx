import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const CategorySkeleton = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [animation]);

  const bgStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#e0e0e0", "#f0f0f0"],
    }),
  };

  const renderRow = (key: number) => (
    <Animated.View key={key} style={[bgStyle, styles.skeletonRow]} />
  );

  return (
    <View className="p-4 flex flex-row items-center gap-4">
      {renderRow(0)}
      {renderRow(1)}
      {renderRow(2)}
      {renderRow(3)}
      {renderRow(4)}
      {renderRow(5)}
      {renderRow(6)}
      {renderRow(7)}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonRow: {
    width: 64,
    height: 64,
    borderRadius: 99,
  },
});

export default CategorySkeleton;
