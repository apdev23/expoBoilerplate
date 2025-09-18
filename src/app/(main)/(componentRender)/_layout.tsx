import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CustomTextInput" />
        <Stack.Screen name="SwitchComponent" />
        <Stack.Screen name="CheckboxRender" />
        <Stack.Screen name="ToastRender" />
        <Stack.Screen name="DropDownRender" />
        <Stack.Screen name="SnackbarRender" />
        <Stack.Screen name="ModalizeRender" />
        <Stack.Screen
          name="MagazineDetails"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            // animationDuration: 5000,
          }}
        />
        <Stack.Screen name="MagazineViewer" />
      </Stack>
    </>
  );
};

export default _layout;
