import React, { ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onDone: () => void;
  children: ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  children,
  onDone,
}) => {
  const animationValue = React.useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      useNativeDriver: true,
    }).start();
  };

  const animateOut = (callback: () => void) => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.poly(4)),
      useNativeDriver: true,
    }).start(() => callback());
  };

  React.useEffect(() => {
    if (isVisible) {
      animateIn();
    }
  }, [isVisible]);

  const scale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ scale }], opacity }]}
        >
          {children}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => animateOut(onClose)}
            >
              <Text style={styles.cancelText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => animateOut(onDone)}
            >
              <Text style={styles.confirmText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  btn: {
    marginHorizontal: 15,
  },
  cancelText: {
    fontSize: 16,
    color: "#6b7280", // slate-500 color
    fontFamily: "System",
  },
  confirmText: {
    fontSize: 16,
    color: "#1d4ed8", // primary-dark color
    fontFamily: "System",
  },
});

export default CustomModal;
