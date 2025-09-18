import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AvatarComponent from "./AvatarComponent";
import PickerModal from "./PickerModal";
import { Feather } from "@expo/vector-icons";

const ImagePickerComponent = ({ selectedImage, setSelectedImage }: any) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const permissionFunction = async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setCameraPermission(cameraStatus === "granted");
      setGalleryPermission(galleryStatus === "granted");

      if (cameraStatus !== "granted" || galleryStatus !== "granted") {
        alert("Permission for media access is required.");
      }
    };

    permissionFunction();
  }, []);

  const takePicture = async () => {
    setVisible(false);
    const photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!photo.canceled && photo.assets?.length > 0) {
      setSelectedImage(photo.assets[0].uri);
    }
  };

  const pickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View className="items-center">
        <AvatarComponent
          source={{
            uri: selectedImage
              ? selectedImage
              : "https://randomuser.me/api/portraits/women/26.jpg",
          }}
          size={110}
        />
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            position: "absolute",
            bottom: -10,
            // right: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
          }}
        >
          <Feather size={18} color={"#333333"} name="edit" />
        </TouchableOpacity>
      </View>

      <PickerModal
        isVisible={visible}
        openCamera={takePicture}
        openGallery={pickImage}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ImagePickerComponent;
