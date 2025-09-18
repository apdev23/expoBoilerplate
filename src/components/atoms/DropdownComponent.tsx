import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownProps {
  label: string;
  data: { label: string; value: string | number }[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  label,
  data,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <View className="my-4">
      <Text className="text-sm  font-primary_font_regular text-black">
        {label}
      </Text>

      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => onChange(item.value)}
        placeholder={placeholder}
        search
        searchPlaceholder="Search..."
        style={{
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 12,
          marginTop: 10,
          borderColor: "#ccc",
        }}
        placeholderStyle={{
          color: "#888",
        }}
      />
    </View>
  );
};

export default DropdownComponent;
