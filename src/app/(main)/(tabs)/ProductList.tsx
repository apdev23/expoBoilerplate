import {
  Dimensions,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import CustomHeader from "@/src/components/atoms/CustomHeader";
import { useRouter } from "expo-router";
import clsx from "clsx";
import { useTheme } from "@/src/hooks/ThemeContext";
import Animated, {
  FadeInDown,
  SharedTransition,
  SharedTransitionType,
  withSpring,
} from "react-native-reanimated";

const magazines = [
  {
    id: "1",
    title: "Fin Tech",
    description: "Latest trends in technology",
    pdfUrl: "https://www.example.com/sample.pdf",
    websiteUrl: "https://www.techtoday.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/fintech-01_2025_freemagazines.top_.webp",
  },
  {
    id: "2",
    title: "Mobile Magazine – January 2025",
    description: "Tips for a healthier life",
    pdfUrl: "https://www.example.com/sample2.pdf",
    websiteUrl: "https://www.healthwellness.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/mobile-01_2025_freemagazines.top_.webp",
  },
  {
    id: "3",
    title: "Good – February/March 2025",
    description: "Discoveries and innovations in science",
    pdfUrl: "https://www.example.com/sample3.pdf",
    websiteUrl: "https://www.scienceworld.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/good-02_03-2025_freemagazines.top_.webp",
  },
  {
    id: "4",
    title: "The Nation – March 2025",
    description: "Latest fashion styles and trends",
    pdfUrl: "https://www.example.com/sample4.pdf",
    websiteUrl: "https://www.fashiontrends.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/the-nation-03_2025_freemagazines.top_.webp",
  },
  {
    id: "5",
    title: "Fin Tech",
    description: "Latest trends in technology",
    pdfUrl: "https://www.example.com/sample.pdf",
    websiteUrl: "https://www.techtoday.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/fintech-01_2025_freemagazines.top_.webp",
  },
  {
    id: "6",
    title: "Mobile Magazine – January 2025",
    description: "Tips for a healthier life",
    pdfUrl: "https://www.example.com/sample2.pdf",
    websiteUrl: "https://www.healthwellness.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/mobile-01_2025_freemagazines.top_.webp",
  },
  {
    id: "7",
    title: "Good – February/March 2025",
    description: "Discoveries and innovations in science",
    pdfUrl: "https://www.example.com/sample3.pdf",
    websiteUrl: "https://www.scienceworld.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/good-02_03-2025_freemagazines.top_.webp",
  },
  {
    id: "8",
    title: "The Nation – March 2025",
    description: "Latest fashion styles and trends",
    pdfUrl: "https://www.example.com/sample4.pdf",
    websiteUrl: "https://www.fashiontrends.com",
    image:
      "https://freemagazines.top/wp-content/uploads/2025/02/the-nation-03_2025_freemagazines.top_.webp",
  },
];

const ProductList = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const transition = SharedTransition.custom((values) => {
    "worklet";
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
    };
  })
    .progressAnimation((values, progress) => {
      "worklet";
      const getValue = (
        progress: number,
        target: number,
        current: number
      ): number => {
        return progress * (target - current) + current;
      };
      return {
        width: getValue(progress, values.targetWidth, values.currentWidth),
        height: getValue(progress, values.targetHeight, values.currentHeight),
      };
    })
    .defaultTransitionType(SharedTransitionType.ANIMATION);

  const MagazineCard = ({ magazine, onPress, index }: any) => {
    return (
      <Animated.View
        entering={FadeInDown.delay(600 * index)}
        className={clsx(
          "mb-4 rounded-xl w-1/2 shadow-md overflow-hidden",
          isDarkMode
            ? "bg-black  border-gray-700 shadow-slate-50 border-x"
            : "bg-white border-0"
        )}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.Image
            sharedTransitionTag={magazine.id}
            source={{ uri: magazine.image }}
            className="w-full h-72"
            style={{ objectFit: "fill" }}
            // sharedTransitionStyle={transition}
          />
          <Text
            className={clsx(
              "text-sm p-2",
              isDarkMode ? "text-gray-100" : "text-black"
            )}
          >
            {magazine.title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className={clsx("flex-1", isDarkMode ? "bg-black" : "bg-white")}>
      <CustomHeader
        title="Product List"
        drawerIcon={true}
        notificationOnPress={() => router.push("/(main)/Notification")}
      />

      <FlatList
        data={magazines}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }: any) => (
          <MagazineCard
            magazine={item}
            onPress={() =>
              router.push({
                pathname: "/(main)/Details",
                params: item,
              })
            }
          />
        )}
        columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
        contentContainerStyle={{
          marginHorizontal: 20,
          gap: 10,
          paddingBottom: 20,
        }}
        style={{ paddingTop: 20 }}
      />
    </View>
  );
};

export default ProductList;
