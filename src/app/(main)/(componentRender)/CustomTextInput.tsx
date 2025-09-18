import { View, ScrollView } from "react-native";
import React from "react";
import PaperTextInput from "@/src/components/atoms/PaperTextInput";

const CustomTextInput = () => {
  return (
    <View className="flex-1">
          <PaperTextInput label="Email" placeholder="Email" />
          <PaperTextInput mode="flat" label="Email" placeholder="Email" />
    </View>
  );
};

export default CustomTextInput;
