import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useSharedValue,
} from "react-native-reanimated";
import colors from "@/tailwind-config/colors";

const SnapCarouselComponent = () => {
  const width = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const progress = useSharedValue(currentIndex);

  const data = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1036269/pexels-photo-1036269.jpeg",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/17474932/pexels-photo-17474932.jpeg",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/670061/pexels-photo-670061.jpeg",
    },
  ];

  // Update progress when carousel snaps to a new item
  React.useEffect(() => {
    progress.value = withTiming(currentIndex, { duration: 500 });
  }, [currentIndex]);

  // Function to apply animated style to each dot
  const dotStyle = (index) => {
    return useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        progress.value,
        [index - 1, index, index + 1],
        [
          '#999',
          colors.primary.dark,
          colors.primary.blackShadeBg,
        ]
      );

      return {
        backgroundColor,
      };
    });
  };

  return (
    <View className="flex-1 items-center mt-5">
      <Carousel
        loop
        width={width / 1.3}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        pagingEnabled
        onSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
        style={{ borderRadius: 5 }}
        renderItem={({ item }) => (
          <View className="flex-1 justify-center">
            <Image
              source={{ uri: item.url }}
              style={{ flex: 1, borderRadius: 10 }}
            />
          </View>
        )}
      />

      <View className="flex-row mt-4">
        {data.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: 10,
                height: 3,
                borderRadius: 2,
                margin: 5,
              },
              dotStyle(index),
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SnapCarouselComponent;
