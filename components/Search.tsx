import useSearchStore from "@/utils/store/searchStore";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

const Search = () => {
  const { handleSearch } = useSearchStore();
  return (
    <View className="w-full px-4">
      <View className="flex flex-row items-center justify-between gap-2 p-4 bg-[#fcfcfc] rounded-[4px]">
        <Ionicons name="search" size={24} color="#f97316" />
        <TextInput
          placeholder="Search ..."
          className="flex-1 text-gray-700 font-semibold h-full border-none outline-none"
          clearButtonMode="always"
          onChangeText={(searchText) => {
            if (searchText !== "") {
              handleSearch(searchText);
            } else {
              handleSearch("");
            }
          }}
        />
      </View>
    </View>
  );
};

export default Search;
