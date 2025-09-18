import colors from "@/tailwind-config/colors";
import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface ButtonProps {
  name: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  marginTop: number;
}

const Button: React.FC<ButtonProps> = ({
  name,
  onPress,
  loading = false,
  disabled = false,
  marginTop = 10,
}) => {
  return (
    <TouchableOpacity
      onPress={() => !loading && onPress()}
      style={[
        styles.button,
        { marginTop: marginTop ? marginTop : marginTop },
        disabled || loading ? styles.disabled : null,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text
          className="text-lg font-Secondary_Font_SemiBold"
          style={{ color: "#ffffff" }}
        >
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.dark,
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: "#a5c1f3",
  },
});

export default Button;
