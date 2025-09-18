import * as React from "react";
import { Text, ViewProps } from "react-native";
import { Card } from "react-native-paper";

interface CardComponentProps {
  title: string;
  content: any;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, content }) => (
  <Card className="mb-5" style={{ backgroundColor: "#ffffff" }}>
    <Card.Content>
      <Text className="text-sm text-black font-Secondary_Font_SemiBold">
        {title}
      </Text>
      {content}
    </Card.Content>
  </Card>
);

export default CardComponent;
