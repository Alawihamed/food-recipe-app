import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <>
      <View className="flex flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="person-circle" size={35} color="#f97316" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications-outline" size={30} color="#f97316" />
        </TouchableOpacity>
      </View>
      <View className="p-4 pt-0">
        <Text className="font-semibold text-lg">Hello, Alawi!</Text>
        <Text className="font-semibold text-4xl">
          Make your own food, stay at
          <Text className="text-orange-500"> home</Text>
        </Text>
      </View>
    </>
  );
};

export default Header;
