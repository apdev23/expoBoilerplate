import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
  ViewStyle,
  View,
} from "react-native";

type PaperTextInputProps = {
  onBlur: () => void;
  onChangeText: (text: string) => void;
  hasErrors: boolean;
  inputStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize: string;
  label: string;
  activeOutlineColor: string;
  isPass?: boolean;
  editable?: boolean;
  mode?: "flat" | "outlined";
  errorMsg?: string;
};

const PaperTextInput: React.FC<PaperTextInputProps> = ({
  onBlur,
  onChangeText,
  inputStyle,
  value,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  label,
  outlineStyle,
  activeOutlineColor,
  isPass,
  mode = "outlined",
  editable = true,
  hasErrors,
  errorMsg,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <TextInput
        style={[styles.input, inputStyle]}
        label={label}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isPass && isPasswordVisible}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        right={
          isPass && (
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              size={18}
              onPress={togglePasswordVisibility}
            />
          )
        }
        mode={mode}
        outlineStyle={outlineStyle}
        activeOutlineColor={activeOutlineColor}
        editable={editable}
      />
      {hasErrors && (
        <HelperText
          type="error"
          visible={hasErrors}
          style={{ fontSize: 12, fontFamily: "SFUIDisplay-Regular" }}
          padding="none"
        >
          {errorMsg}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 0,
    fontSize: 13,
    backgroundColor: "#ffffff",
  },
});

export default PaperTextInput;
