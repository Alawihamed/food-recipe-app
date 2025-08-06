import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex flex-col gap-2 items-center justify-center bg-orange-500">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="items-center"
        >
          <View className="flex flex-col items-center justify-center bg-[#e2d4cf25] p-10 rounded-full animate-pulse">
            <View className="flex flex-col items-center justify-center bg-[#ffebe349] p-10 rounded-full animate-pulse">
              <Image
                source={require("../assets/images/logo.png")}
                className="max-w-60 max-h-60"
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="items-center"
        >
          <Text className="text-4xl font-bold text-white mt-4">
            Golden Fork
          </Text>
          <Text className="font-semibold text-lg text-gray-100">
            Every bite, a golden moment
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
