import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import CustomHeader from "@/src/components/atoms/CustomHeader";
import { Button, Snackbar } from "react-native-paper";
import CustomTextInput from "../(componentRender)/CustomTextInput";
import SwitchComponent from "../(componentRender)/SwitchComponent";
import CheckboxRender from "../(componentRender)/CheckboxRender";
import CardComponent from "@/src/components/atoms/CardComponent";
import ToastComponent from "@/src/components/atoms/ToastComponent";
import Toast from "react-native-toast-message";
import DropDownRender from "../(componentRender)/DropDownRender";
import BottomSheetRender from "@/src/components/atoms/BottomSheetRender";
import { useRouter } from "expo-router";
import DateAndTimePickerComponent from "@/src/components/atoms/DateAndTimePickerComponent";
import VideoPlay from "@/src/components/atoms/VideoPlay";
import SliderBar from "@/src/components/atoms/SliderBar";
import DateRangePicker from "@/src/components/atoms/DateRangePicker";
import SearchBarComponent from "@/src/components/atoms/SearchBarComponent";
import SnapCarouselComponent from "@/src/components/atoms/SnapCarouselComponent";
import AudioPlayer from "@/src/components/atoms/AudioPlayer";
import SampleButton from "@/src/components/atoms/SampleButton";
import { MotiView } from "moti";

const HomeScreen = () => {
  const router = useRouter();
  // Toast State---------------------------------------------------------------------------------------------------

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toast State End---------------------------------------------------------------------------------------------------

  // Snackbar State---------------------------------------------------------------------------------------------------
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  // Snackbar State End---------------------------------------------------------------------------------------------------

  // Modalize Bottom Sheet State---------------------------------------------------------------------------------------------------
  const modalRef = useRef(null);

  const openModalFromParent = () => {
    modalRef.current?.open();
  };

  // Modalize Bottom Sheet State End---------------------------------------------------------------------------------------------------

  return (
    <View className="flex-1 bg-white">
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exiting={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring" }}
      >
        <CustomHeader
          title="Home"
          drawerIcon={true}
          notificationOnPress={() => router.push("/(main)/Notification")}
        />
        <ScrollView>
          <View className="flex-1 py-5 mx-8">
            {/* Carousel */}
            <CardComponent
              title="Carousel"
              content={<SnapCarouselComponent />}
            />
            {/* Paper Text Input */}
            <CardComponent
              title="Paper Text Input"
              content={<CustomTextInput />}
            />

            {/* Search bar */}
            <CardComponent
              title="Search Bar"
              content={
                <View className="mt-5">
                  <SearchBarComponent
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                </View>
              }
            />

            {/* Switch toggle */}
            <CardComponent
              title="Switch toggle"
              content={<SwitchComponent />}
            />

            {/* Check Boxes */}
            <CardComponent title="Check Boxes" content={<CheckboxRender />} />

            {/* Toast Component */}
            <CardComponent
              title="Toast Component"
              content={
                <View className="flex-1 justify-center items-center mt-5 bg-gray-100">
                  <Button onPress={() => setShowSuccessToast(true)}>
                    Show Success Toast
                  </Button>

                  <Button onPress={() => setShowErrorToast(true)}>
                    Show Error Toast
                  </Button>
                </View>
              }
            />

            {/* Dropdown */}
            <CardComponent title="Dropdown" content={<DropDownRender />} />

            {/* Snackbar */}
            <CardComponent
              title="Snackbar"
              content={
                <View className="my-5">
                  <Button onPress={onToggleSnackBar}>
                    {visible ? "Hide" : "Show"} Snackbar
                  </Button>
                </View>
              }
            />

            {/* BottomSheet Component */}
            <CardComponent
              title="BottomSheet Component"
              content={
                <View className="my-5">
                  <Button
                    onPress={(event) => {
                      event.persist();
                      openModalFromParent();
                    }}
                  >
                    Open Bottom Sheet
                  </Button>
                </View>
              }
            />
            {/* Date And Time Picker */}
            <CardComponent
              title="Date and Time Picker"
              content={<DateAndTimePickerComponent />}
            />

            {/* Audio Player */}
            <CardComponent title="Audio Player" content={<AudioPlayer />} />

            {/* Video Player */}
            <CardComponent title="Video Player" content={<VideoPlay />} />

            {/* Slider */}
            <CardComponent title="Slider Range" content={<SliderBar />} />

            {/* DateRangePicker */}
            <CardComponent
              title="Date Range Picker"
              content={<DateRangePicker />}
            />
          </View>
        </ScrollView>
      </MotiView>
      {/* Trigger ToastComponent */}
      {showSuccessToast && (
        <ToastComponent
          type="success"
          message="Success! This is a success message."
          position="top"
          duration={4000}
        />
      )}
      {showErrorToast && (
        <ToastComponent
          type="error"
          message="Oops! Something went wrong."
          position="top"
          duration={4000}
        />
      )}
      <Toast />

      {/* Snackbar */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text>Hey there! I'm a Snackbar.</Text>
      </Snackbar>

      {/* Modalize Bottom Sheet */}
      <BottomSheetRender ref={modalRef}>
        <Text className="text-center py-10">This is inside the modal!</Text>
      </BottomSheetRender>
    </View>
  );
};

export default HomeScreen;
