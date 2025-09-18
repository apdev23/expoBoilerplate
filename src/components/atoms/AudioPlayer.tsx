import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  useAudioPlayer,
  AudioStatus,
  AudioPlayer as AudioPlayers,
} from "expo-audio";
import Slider from "@react-native-community/slider";
import colors from "@/tailwind-config/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSource =
    "https://actions.google.com/sounds/v1/weather/light_rain.ogg";

  const player = useAudioPlayer(audioSource);

  const playFunction = () => {
    if (player.currentStatus.playbackState == "ready") {
      if (player.playing == true) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  const SkipToPrevious = () => {
    player.seekTo(Math.max(0, player.currentTime - 10)); // Rewind 10s
  };

  const SkipToNext = () => {
    player.seekTo(Math.min(duration, player.currentTime + 10)); // Forward 10s
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      setCurrentTime(status?.currentTime || 0);
      setIsPlaying(status?.playing || false);
      setDuration(player?.duration || 0);
    });
  }, [player.currentTime]);

  return (
    <View className="flex-1 justify-center">
      <View className="my-5">
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={colors.primary.dark}
          maximumTrackTintColor="#000000"
          thumbTintColor={colors.primary.dark}
          value={currentTime}
          onSlidingComplete={(time) => player.seekTo(time)}
        />
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-black font-primary_font_regular px-3">
            {formatTime(currentTime)}
          </Text>
          <Text className="text-sm text-black font-primary_font_regular px-5">
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      <View className="self-center flex-row items-center">
        <MaterialIcons
          name={"replay-10"}
          size={30}
          color={"#333333"}
          onPress={() => SkipToPrevious()}
        />
        <MaterialCommunityIcons
          name={isPlaying == true ? "pause" : "play"}
          size={50}
          color={"#333333"}
          onPress={() => playFunction()}
          style={{ marginHorizontal: 15 }}
        />
        <MaterialIcons
          name={"forward-10"}
          size={30}
          color={"#333333"}
          onPress={() => SkipToNext()}
        />
      </View>
    </View>
  );
};

export default AudioPlayer;
