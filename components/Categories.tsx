import { CategoriesResponse } from "@/types";
import { getApi } from "@/utils";
import useCategoryStore from "@/utils/store/categoryStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySkeleton from "./CategorySkeleton";

const Categories = () => {
  const { data, isLoading, error, refetch } = useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () =>
      getApi({
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  const { category: selectedCategory, handleCategory } = useCategoryStore();

  useEffect(() => {
    if (data?.categories) {
      handleCategory(data.categories[0]?.strCategory);
    }
  }, [data?.categories]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <CategorySkeleton />
      </SafeAreaView>
    );
  }

  if (error || !data?.categories) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-red-500 text-center font-semibold">
            Failed to load categories.
          </Text>
          <TouchableOpacity
            onPress={() => window.location.reload()}
            className="mt-4 bg-orange-500 px-4 py-2 rounded-full min-w-[100px]"
          >
            <Text className="text-white font-semibold text-center">Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex flex-row p-4">
      <FlatList
        onRefresh={() => refetch()}
        refreshing={isLoading && !!data}
        data={data?.categories}
        keyExtractor={(category) => category.idCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          display: "flex",
          flexDirection: "row",
        }}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            onPress={() => {
              handleCategory(category.strCategory);
            }}
          >
            <View className="flex flex-col items-center justify-center gap-2">
              <View
                className={`max-h-16 max-w-16 min-h-16 min-w-16 rounded-full bg-orange-100 p-1 ${selectedCategory === category.strCategory && "bg-orange-200 border border-solid border-orange-200"}`}
              >
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  className="max-h-full max-w-full min-h-full min-w-full rounded-full"
                />
              </View>
              <Text className="font-semibold text-base text-gray-500">
                {category.strCategory}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default Categories;
