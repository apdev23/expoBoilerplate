import React from "react";
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";

type TextInputProps = {
  onBlur: () => void;
  onChangeText: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize: string;
};

const CustomTextInput: React.FC<TextInputProps> = ({
  onBlur,
  onChangeText,
  inputStyle,
  value,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = undefined,
}) => {
  return (
    <TextInput
      style={{ ...styles.input, inputStyle }}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="gray"
      className=" py-5"
      autoCapitalize={autoCapitalize}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 20,
    color: "#ffffff",
    backgroundColor: "#F2F2F7",
  },
});

export default CustomTextInput;
