import { View, Text } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import colors from "@/tailwind-config/colors";
const SliderBar = () => {
  const [value, setValue] = useState(0);
  return (
    <View className="my-5">
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={colors.primary.dark}
        maximumTrackTintColor="#000000"
        thumbTintColor={colors.primary.dark}
        value={value}
        onSlidingComplete={setValue}
      />
      <Text className="text-sm text-black font-primary_font_regular px-3">
        {value.toFixed(0)}
      </Text>
    </View>
  );
};

export default SliderBar;
