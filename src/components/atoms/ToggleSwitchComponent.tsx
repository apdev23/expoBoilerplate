import colors from "@/tailwind-config/colors";
import React from "react";
import ToggleSwitch from "toggle-switch-react-native";

interface ToggleSwitchProps {
  label?: string;
  isOn?: boolean;
  onColor?: string | "";
  offColor?: string | "";
  size?: "small" | "medium" | "large";
  onToggle: (isOn: boolean) => void;
}

const ToggleSwitchComponent: React.FC<ToggleSwitchProps> = ({
  label,
  isOn,
  onColor = colors.secondary.GREEN,
  offColor = colors.secondary.BLANK,
  size,
  onToggle,
}) => {
  return (
    <ToggleSwitch
      isOn={isOn}
      onColor={onColor}
      offColor={offColor}
      size={size}
      onToggle={onToggle}
      label={label}
      labelStyle={{ fontSize: 12 }}
    />
  );
};
export default ToggleSwitchComponent;
