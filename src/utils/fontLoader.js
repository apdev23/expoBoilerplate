import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

// Define your custom font loading function
export const loadFonts = () => {
  return useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,

    "SFUIDisplay-Thin": require("../assets/fonts/sf-ui-display-thin.otf"),
    "SFUIDisplay-Regular": require("../assets/fonts/sf-ui-display-medium.otf"),
    "SFUIDisplay-SemiBold": require("../assets/fonts/sf-ui-display-semibold.otf"),
    "SFUIDisplay-Bold": require("../assets/fonts/sf-ui-display-bold.otf"),
  });
};
