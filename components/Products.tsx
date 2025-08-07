import { ProductsResponse } from "@/types";
import { getApi } from "@/utils";
import { useDebounce } from "@/utils/hooks/useDebounce";
import useCategoryStore from "@/utils/store/categoryStore";
import useSearchStore from "@/utils/store/searchStore";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductSkeleton from "./ProductSkeleton";

const Products = () => {
  const { category: selectedCategory } = useCategoryStore();
  const { query } = useSearchStore();
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error, refetch } = useQuery<ProductsResponse>({
    queryKey: ["products", selectedCategory, debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery) {
        return getApi({
          url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(debouncedQuery)}`,
        });
      } else {
        return getApi({
          url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`,
        });
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <ProductSkeleton />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-red-500 text-center font-semibold">
            Failed to load products.
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

  if (data?.meals === null) {
    return (
      <View className="flex-1 p-4 justify-center items-center">
        <Ionicons name="alert-circle" size={48} color="#f97316" />
        <Text className="text-orange-500 text-center font-semibold text-lg">
          No products found.
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full flex-1 px-4">
      <FlatList
        onRefresh={() => refetch()}
        refreshing={isLoading && !!data}
        data={data?.meals}
        keyExtractor={(meal) => meal.idMeal}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
          gap: 16,
        }}
        numColumns={2}
        renderItem={({ item: meal }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(meal);
            }}
            activeOpacity={0.7}
            className="flex-1 flex flex-col items-center justify-center p-2 bg-[#ffffff] rounded-md shadow-sm"
          >
            <View className="flex flex-col items-center gap-2 justify-center">
              <View
                className={`max-h-24 max-w-24 min-h-24 min-w-24 rounded-full bg-orange-100 p-1`}
              >
                <Image
                  source={{ uri: meal.strMealThumb }}
                  className="max-h-full max-w-full min-h-full min-w-full rounded-full"
                />
              </View>
              <Text className="font-semibold text-base text-gray-500 text-center">
                {meal.strMeal}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default Products;
