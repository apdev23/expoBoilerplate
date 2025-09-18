import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import AnimationScreen from "./AnimationScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <SafeAreaView className="flex-1">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <AnimationScreen />
        </View>
      </SafeAreaView>
    );

  if (isSignedIn) {
    return <Redirect href={"/(main)/(tabs)/Index"} />;
  }

  return (
    <>
      <Redirect href="/(auth)" />
    </>
  );
};

export default index;
