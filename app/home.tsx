import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Search from "@/components/Search";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="bg-[#fff4eccb] h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Search />
        <Categories />
        <Products />
      </ScrollView>
    </SafeAreaView>
  );
}
