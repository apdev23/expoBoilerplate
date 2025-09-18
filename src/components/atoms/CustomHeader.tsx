import { useTheme } from "@/src/hooks/ThemeContext";
import colors from "@/tailwind-config/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { router, useNavigation, useRouter } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

interface CustomHeaderProps {
  title: string;
  onGoBack?: boolean;
  drawerIcon?: boolean;
  onSearch?: () => void;
  notificationOnPress?: () => void;
  textAlign?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onGoBack,
  onSearch,
  notificationOnPress,
  drawerIcon,
  textAlign = "center",
}) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <Appbar.Header
      mode="small"
      style={{
        backgroundColor: isDarkMode ? "#000000" : colors.primary.lightBg,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {onGoBack && (
        <Appbar.BackAction
          color={isDarkMode ? "#fff" : "#000"}
          onPress={() => router.back()}
        />
      )}
      {drawerIcon && (
        <Appbar.Action
          icon="menu"
          color={isDarkMode ? "#fff" : "#000"}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 15,
          textAlign: textAlign,
          fontFamily: "SFUIDisplay-SemiBold",
          color: isDarkMode ? "#fff" : "#000",
        }}
      />
      {notificationOnPress && (
        <Appbar.Action
          icon="bell"
          color={colors.secondary.YELLOW}
          onPress={notificationOnPress}
        />
      )}
    </Appbar.Header>
  );
};

export default CustomHeader;
