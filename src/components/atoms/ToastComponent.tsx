import React from "react";
import Toast from "react-native-toast-message";

interface ToastComponentProps {
  type: "success" | "error" | "info";
  message: string;
  position?: "top" | "bottom";
  duration?: number;
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  type,
  message,
  position = "bottom",
  duration = 3000, // Default to 3 seconds
}) => {
  const showToast = () => {
    Toast.show({
      type,
      position,
      text1: message,
      visibilityTime: duration,
    });
  };

  React.useEffect(() => {
    showToast();
  }, [message, type, position, duration]);

  return null;
};

export default ToastComponent;
