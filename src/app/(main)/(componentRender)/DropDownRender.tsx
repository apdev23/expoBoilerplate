import { View, Text } from "react-native";
import React, { useState } from "react";
import DropdownComponent from "@/src/components/atoms/DropdownComponent";

const DropDownRender = () => {
  const [selectedValue, setSelectedValue] = useState<string | number>("");

  const handleDropdownChange = (value: string | number) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  const dropdownData = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <View className="flex-1">
      <View className="px-5 mt-5">
        <DropdownComponent
          label="Choose an option"
          data={dropdownData}
          value={selectedValue}
          onChange={handleDropdownChange}
          placeholder="Select a value"
        />
        {selectedValue && (
          <Text className="text-sm text-black font-primary_font_regular mt-4">
            Selected:{" "}
            {dropdownData.find((item) => item.value === selectedValue)?.label}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DropDownRender;
