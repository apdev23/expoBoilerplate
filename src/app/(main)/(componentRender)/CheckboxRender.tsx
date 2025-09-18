import { View } from "react-native";
import React, { useState } from "react";
import CheckboxComponent from "@/src/components/atoms/CheckBoxComponent";

const CheckboxRender = () => {
  const [options, setOptions] = useState({
    option1: true,
    option2: false,
    option3: false,
  });

  const handleToggle = (key: string, checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <View className="flex-1">
      <View className="my-5 self-center">
        <CheckboxComponent
          label="Option 1"
          checked={options.option1}
          onToggle={(checked) => handleToggle("option1", checked)}
          color="blue"
        />
        <CheckboxComponent
          label="Option 2"
          checked={options.option2}
          onToggle={(checked) => handleToggle("option2", checked)}
          color="red"
        />
        <CheckboxComponent
          label="Option 3"
          checked={options.option3}
          onToggle={(checked) => handleToggle("option3", checked)}
        />
      </View>
    </View>
  );
};

export default CheckboxRender;
