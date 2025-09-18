import { View, Text, Image } from "react-native";
import React from "react";
import CustomHeader from "@/src/components/atoms/CustomHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { useTheme } from "@/src/hooks/ThemeContext";
import clsx from "clsx";
import colors from "@/tailwind-config/colors";
import Animated, { FadeInLeft } from "react-native-reanimated";

const MagazineDetails = ({ route }: any) => {
  const item = useLocalSearchParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <Animated.View
      className={clsx("flex-1", isDarkMode ? "bg-black" : "bg-white")}
    >
      <CustomHeader title={item.title} onGoBack textAlign={"left"} />
      <Animated.Image
        sharedTransitionTag={item.id.toString()}
        source={{ uri: item?.image }}
        className="w-80 h-96 self-center"
        style={{ objectFit: "fill" }}
      />

      <View className="p-4">
        <Animated.Text
          className={clsx(
            "font-bold my-2 text-xl",
            isDarkMode ? "text-white" : "text-black"
          )}
          entering={FadeInLeft.duration(1000).delay(1000)}
        >
          {item.title}
        </Animated.Text>
        <Animated.Text
          className={clsx(
            "text-gray-600 mb-4",
            isDarkMode ? "text-gray-300" : "text-black"
          )}
          entering={FadeInLeft.duration(1000).delay(1000)}
        >
          {item.description}
        </Animated.Text>
      </View>
      <View className="w-60 self-center">
        <Button
          buttonColor={colors.primary.dark}
          textColor="#fff"
          onPress={() =>
            router.push("/(main)/(componentRender)/MagazineViewer")
          }
        >
          View Magazine
        </Button>
      </View>
    </Animated.View>
  );
};

export default MagazineDetails;
