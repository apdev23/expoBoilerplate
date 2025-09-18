import React from "react";
import { Avatar } from "react-native-paper";

interface AvatarProps {
  size?: number;
  source: any;
}

const AvatarComponent: React.FC<AvatarProps> = ({ size = 48, source }) => {
  return <Avatar.Image size={size} source={source} />;
};

export default AvatarComponent;
