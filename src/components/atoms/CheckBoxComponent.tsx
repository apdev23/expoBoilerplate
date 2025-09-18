import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  color?: string;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
  label,
  checked,
  onToggle,
  color = "green",
}) => {
  return (
    <View className="flex flex-row items-center space-x-2 my-2">
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => onToggle(!checked)}
        color={color}
      />
      <Text className="text-lg font-medium">{label}</Text>
    </View>
  );
};

export default CheckboxComponent;
