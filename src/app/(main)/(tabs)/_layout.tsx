import colors from "@/tailwind-config/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "@/src/hooks/ThemeContext";

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  const { isSignedIn } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary.dark,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#000000" : colors.primary.lightBg,
          height: 60,
        },
        tabBarItemStyle: { paddingBottom: 10 },
        tabBarLabelStyle: { fontFamily: "SFUIDisplay-Regular" },
      }}
    >
      <Tabs.Screen
        name="Index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="home" color={color} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="gear" color={color} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="ProductList"
        options={{
          title: "Product List",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="product-hunt" color={color} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="user" color={color} />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
