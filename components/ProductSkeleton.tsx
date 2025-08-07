import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const ProductSkeleton = () => {
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
    <View className="p-4 flex flex-row flex-wrap items-center gap-4">
      {Array.from({ length: 8 }, (_, i) => renderRow(i))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonRow: {
    width: "48%",
    height: 145,
    borderRadius: 6,
  },
});

export default ProductSkeleton;
