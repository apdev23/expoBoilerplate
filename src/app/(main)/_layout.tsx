import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import AvatarComponent from "@/src/components/atoms/AvatarComponent";
import { Divider } from "react-native-paper";
import colors from "@/tailwind-config/colors";
import CustomModal from "@/src/components/atoms/CustomModal";
import { useClerk, useUser } from "@clerk/clerk-react";
import Toast from "react-native-toast-message";

const MainLayout = (props: any) => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const router = useRouter();
  const pathname = usePathname();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        {/* Profile Section */}
        <Pressable
          onPress={() => router.push("/(main)/(tabs)/ProfileScreen")}
          className="flex-row items-center px-3 pb-5"
        >
          <AvatarComponent
            source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
            size={80}
          />
          <View className="ml-5">
            <Text className="text-lg font-Secondary_Font_SemiBold text-black">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-sm font-Secondary_Font_Regular text-black">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>
          </View>
        </Pressable>

        <Divider />

        {/* Drawer Items */}
        <DrawerItem
          icon={({ size }: any) => (
            <Feather
              name="home"
              size={size}
              color={pathname === "/Index" ? "#000000" : "#000000"}
            />
          )}
          label="Home"
          labelStyle={{ color: pathname === "/Index" ? "#000000" : "#000000" }}
          style={{
            backgroundColor:
              pathname === "/Index" ? colors.primary.sidebarBg : "#fff",
            marginTop: 20,
          }}
          onPress={() => {
            router.push("/Index");
          }}
        />
        <DrawerItem
          icon={({ size }: any) => (
            <Feather
              name="user"
              size={size}
              color={pathname === "/ProfileScreen" ? "#000000" : "#000000"}
            />
          )}
          label="Profile"
          labelStyle={{
            color: pathname === "/ProfileScreen" ? "#000000" : "#000000",
          }}
          style={{
            backgroundColor:
              pathname === "/ProfileScreen" ? colors.primary.sidebarBg : "#fff",
          }}
          onPress={() => {
            router.push("/(main)/(tabs)/ProfileScreen");
          }}
        />
        <DrawerItem
          icon={({ size }: any) => (
            <MaterialIcons
              name="notifications"
              size={size}
              color={pathname === "/Notification" ? "#000000" : "#000000"}
            />
          )}
          label="Notification"
          labelStyle={{
            color: pathname === "/Notification" ? "#000000" : "#000000",
          }}
          style={{
            backgroundColor:
              pathname === "/Notification" ? colors.primary.sidebarBg : "#fff",
          }}
          onPress={() => {
            router.push("/(main)/Details");
          }}
        />
        <DrawerItem
          icon={({ size }: any) => (
            <MaterialIcons
              name="details"
              size={size}
              color={pathname === "/Details" ? "#000000" : "#000000"}
            />
          )}
          label="Details"
          labelStyle={{
            color: pathname === "/Details" ? "#000000" : "#000000",
          }}
          style={{
            backgroundColor:
              pathname === "/Details" ? colors.primary.sidebarBg : "#fff",
          }}
          onPress={() => {
            router.push("/(main)/Details");
          }}
        />

        <View style={{ flex: 1 }} />

        <View className="px-3 pb-5">
          <DrawerItem
            icon={({ size }: any) => (
              <AntDesign name="logout" size={size} color="#000000" />
            )}
            label="Sign out"
            labelStyle={{ color: "#000000" }}
            style={{
              backgroundColor: "#fff",
            }}
            onPress={openModal}
          />
          {/* Custom Modal */}
          <CustomModal
            isVisible={isModalVisible}
            onDone={() => handleSignOut()}
            onClose={closeModal}
          >
            <Text>Are you sure you want to sign out?</Text>
          </CustomModal>
        </View>
        <Toast />
      </DrawerContentScrollView>
    </>
  );
};

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props: any) => <MainLayout {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Drawer.Screen name="Details" options={{ headerShown: true }} /> */}
    </Drawer>
  );
}
