import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/src/components/atoms/CustomHeader";
import { useRouter } from "expo-router";
import ToggleSwitchComponent from "@/src/components/atoms/ToggleSwitchComponent";
import { useTheme } from "@/src/hooks/ThemeContext";
import clsx from "clsx";
import Video from "react-native-video";

const Setting = () => {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isSwitchOn, setIsSwitchOn] = useState(isDarkMode);

  const handleSwitchToggle = (isOn: boolean) => {
    setIsSwitchOn(isOn);
    toggleTheme();
  };

  useEffect(() => {}, [isDarkMode]);

  console.log(isDarkMode, "isDarkMode");

  return (
    <View className={clsx("flex-1 ", isDarkMode ? "bg-black" : "bg-white")}>
      <CustomHeader
        title="Setting"
        drawerIcon={true}
        notificationOnPress={() => router.push("/(main)/Notification")}
      />
      <ScrollView className="flex-1" keyboardDismissMode={"interactive"}>
        <View className="px-5 flex-row items-center justify-between mt-5">
          <Text
            className={clsx(
              "font-primary_font_regular text-sm",
              isDarkMode ? "text-primary-lightBg" : "text-black"
            )}
          >{`Notification is ${isSwitchOn ? "On" : "Off"}`}</Text>
          <ToggleSwitchComponent
            label={""}
            isOn={isSwitchOn}
            size="small"
            onToggle={handleSwitchToggle}
          />
        </View>
        <Video
          source={{
            uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          }}
          controls
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
        />
      </ScrollView>
    </View>
  );
};

export default Setting;
