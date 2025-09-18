import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { loadFonts } from "../utils/fontLoader";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import Color from "@/tailwind-config/colors";
import { tokenCache } from "@/cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";

import "../../global.css";
import { View } from "react-native";
import AnimationScreen from "./AnimationScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/src/hooks/ThemeContext";

// SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary.dark,
    secondary: Color.secondary.YELLOW,
  },
};

const RootNavigation = () => {
  const [fontsLoaded] = loadFonts();
  const [appReady, setAppReady] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // useEffect(() => {
  //   const prepareApp = async () => {
  //     await fontsLoaded;
  //     // await SplashScreen.hideAsync();
  //   };

  //   prepareApp();
  // }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setAppReady(true);
      }, 1500);
    }
  }, [fontsLoaded]);

  if (!appReady || !showAnimation) {
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
          {/* <AnimationScreen setShowAnimation={setShowAnimation} /> */}
          <AnimationScreen
            onAnimationFinish={(isCancelled) => {
              console.log("check----finished");
              if (!isCancelled) {
                setShowAnimation(true);
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar style="auto" />
      <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLISHABLE_KEY}>
        <ClerkLoaded>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <PaperProvider theme={theme}> */}
                <ThemeProvider>
                  <Slot />
                </ThemeProvider>
              {/* </PaperProvider> */}
            </PersistGate>
          </Provider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};

export default RootNavigation;
