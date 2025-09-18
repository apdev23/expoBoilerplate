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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type PickerModalProps = {
  isVisible: boolean;
  openCamera: () => void;
  openGallery: () => void;
  onClose: () => void;
};

const PickerModal: React.FC<PickerModalProps> = ({
  isVisible,
  openCamera,
  onClose,
  openGallery,
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
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ scale }], opacity }]}
        >
          <View>
            <View className="pb-5">
              <TouchableOpacity
                onPress={() => animateOut(onClose)}
                style={{ alignSelf: "center" }}
              >
                <MaterialCommunityIcons
                  name="close"
                  color={"#333333"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row pb-5">
              <TouchableOpacity
                style={styles.btn}
                onPress={() => animateOut(openCamera)}
              >
                <MaterialCommunityIcons
                  name="camera"
                  color={"#333333"}
                  size={30}
                />
                <Text className="text-sm text-black font-primary_font_regular">
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => animateOut(openGallery)}
              >
                <MaterialIcons
                  name="add-photo-alternate"
                  color={"#333333"}
                  size={30}
                />
                <Text className="text-sm text-black font-primary_font_regular">
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },

  btn: {
    marginHorizontal: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#d3d3d3",
  },
});

export default PickerModal;
