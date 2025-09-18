import { View } from "react-native";
import React, { useState } from "react";
import ToggleSwitchComponent from "@/src/components/atoms/ToggleSwitchComponent";

const SwitchComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchToggle = (isOn: boolean) => {
    setIsSwitchOn(isOn);
  };

  return (
    <View className="flex-1">
      <View className="my-5 self-center">
        <ToggleSwitchComponent
          label={`is ${isSwitchOn ? "On" : "Off"}`}
          isOn={isSwitchOn}
          size="small"
          onToggle={handleSwitchToggle}
        />
      </View>
    </View>
  );
};

export default SwitchComponent;
