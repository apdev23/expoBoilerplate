import CustomHeader from "@/src/components/atoms/CustomHeader";
import colors from "@/tailwind-config/colors";
import React from "react";
import { View, Text, FlatList, Animated } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: 1,
    title: "New Message",
    message: "You have a new message from John.",
    time: "2 mins ago",
    status: "denger",
  },
  {
    id: 2,
    title: "Project Update",
    message: "The project 'Alpha' has been updated.",
    time: "10 mins ago",
    status: "warning",
  },
  {
    id: 3,
    title: "Reminder",
    message: "Don't forget your meeting at 3 PM.",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    title: "New Follower",
    message: "Sarah started following you.",
    time: "3 hours ago",
    status: "info",
  },
  {
    id: 5,
    title: "System Alert",
    message: "Your password was changed successfully.",
    time: "Yesterday",
    status: "default",
  },
];

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  status: string;
};

const NotificationScreen: React.FC = () => {
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const renderItem = ({
    item,
    index,
  }: {
    item: Notification;
    index: number;
  }) => {
    const itemAnimation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [50 + index * 10, 0],
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateY: itemAnimation }],
          opacity: animation,
          marginBottom: 16,
        }}
      >
        <Card
          className="border border-gray-200 shadow-sm rounded-2xl"
          style={{
            backgroundColor:
              item?.status == "denger"
                ? "#dc3545"
                : item?.status == "warning"
                ? "#ffc107"
                : item?.status == "success"
                ? "#198754"
                : item?.status == "info"
                ? "#0dcaf0"
                : colors?.primary?.lightBg,
          }}
        >
          <Card.Content>
            <View className="flex-row justify-between items-center mb-2">
              <Text
                className={`text-lg font-semibold ${
                  item?.status === "default" ? "text-black" : "text-white"
                }`}
              >
                {item.title}
              </Text>
              <Text
                className={`text-sm ${
                  item?.status === "default" ? "text-black" : "text-white"
                }`}
              >
                {item.time}
              </Text>
            </View>
            <Text
              className={`text-sm ${
                item?.status === "default" ? "text-black" : "text-white"
              }`}
            >
              {item.message}
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Notification" onGoBack textAlign={"left"} />
      <View className="flex-1 bg-white p-4 pt-10">
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
