import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/src/components/atoms/CustomHeader";
import PaperTextInput from "@/src/components/atoms/PaperTextInput";
import { useRouter } from "expo-router";
import CustomModal from "@/src/components/atoms/CustomModal";
import colors from "@/tailwind-config/colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import ImagePickerComponent from "@/src/components/atoms/ImagePickerComponent";
import { useClerk, useUser } from "@clerk/clerk-react";
import Toast from "react-native-toast-message";
import Button from "@/src/components/atoms/Button";

const ProfileScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // State for profile details
  const [profileDetails, setProfileDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: "9666565600",
    email: user?.emailAddresses[0]?.emailAddress,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setModalVisible(false);

      Toast.show({
        type: "success",
        text1: "Sign Out Successful",
      });
      router.replace("/(auth)");
    } catch (err: any) {
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Sign out Failed",
        text2:
          err?.errors?.[0]?.message ||
          "Something went wrong. Please try again.",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const UpdateProfile = async () => {
    const firstName = profileDetails?.firstName;
    const lastName = profileDetails?.lastName;
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
      setIsEdit(false);
      // console.log(result, "result");
    } catch (error) {
      console.log(JSON.stringify(error), "error----");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeader
        title="Profile"
        drawerIcon={true}
        notificationOnPress={() => router.push("/(main)/Notification")}
      />

      <ScrollView className="flex-1" keyboardDismissMode={"interactive"}>
        <TouchableOpacity
          onPress={() => setIsEdit(true)}
          className="absolute flex-row justify-center right-5 top-5 rounded-md bg-slate-50 elevation-md px-2 py-1"
        >
          <Text className="text-xs font-primary_font_Medium text-black">
            Edit{" "}
          </Text>
          <Feather size={14} color={"#333333"} name="edit" />
        </TouchableOpacity>
        <View className="px-5 self-center mt-10">
          <ImagePickerComponent
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />

          <Text className="text-black text-lg font-Secondary_Font_Bold text-center mt-4">
            {profileDetails.firstName}
          </Text>
        </View>

        <View className="mt-8 px-8 space-y-6">
          {/* Name */}
          <PaperTextInput
            label={"Name"}
            value={profileDetails.firstName || ""}
            editable={isEdit ? true : false}
            outlineStyle={{ borderColor: colors.primary.dark }}
            onChangeText={(text) =>
              setProfileDetails((prevDetails) => ({
                ...prevDetails,
                firstName: text,
              }))
            }
          />
          <PaperTextInput
            label={"Last Name"}
            value={profileDetails.lastName || ""}
            editable={isEdit ? true : false}
            outlineStyle={{ borderColor: colors.primary.dark }}
            onChangeText={(text) =>
              setProfileDetails((prevDetails) => ({
                ...prevDetails,
                lastName: text,
              }))
            }
          />

          {/* Phone */}
          <PaperTextInput
            label={"Phone Number"}
            value={profileDetails?.phone}
            editable={false}
            outlineStyle={{ borderColor: colors.primary.dark }}
          />

          {/* Email */}
          <PaperTextInput
            label={"Email"}
            value={profileDetails.email || ""}
            editable={false}
            keyboardType="email-address"
            outlineStyle={{ borderColor: colors.primary.dark }}
          />
        </View>
      </ScrollView>

      <View className="px-8 pb-10">
        {isEdit && <Button name="Submit" onPress={() => UpdateProfile()} />}
      </View>
      <View className="mb-5 px-8">
        <TouchableOpacity className="self-center" onPress={toggleModal}>
          <Text className="text-sm font-Secondary_Font_Regular text-black">
            <AntDesign name="logout" size={15} color="#000000" /> Sign out
          </Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        isVisible={isModalVisible}
        onDone={() => handleSignOut()}
        onClose={toggleModal}
      >
        <Text className="text-sm text-center font-Secondary_Font_Regular">
          Are you sure you want to sign out?
        </Text>
      </CustomModal>

      <Toast />
    </View>
  );
};

export default ProfileScreen;
