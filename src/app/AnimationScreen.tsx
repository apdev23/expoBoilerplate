// import Rive from "rive-react-native";

// interface AnimatedScreenProps {
//   setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function AnimationScreen({
//   setShowAnimation,
// }: AnimatedScreenProps) {
//   return (
//     <Rive
//       resourceName="vehicles"
//       style={{
//         maxWidth: 280,
//         maxHeight: 280,
//         width: "100%",
//         height: "100%",
//       }}
//       onPause={() => {
//         setShowAnimation(true);
//       }}
//       onStop={() => {
//         setShowAnimation(false);
//       }}
//     />
//   );
// }

import { View, Text } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

const AnimationScreen = ({
  onAnimationFinish = () => {},
}: {
  onAnimationFinish?: () => void;
}) => {
  const animation = useRef<LottieView>(null);

  console.log(onAnimationFinish, "onAnimationFinish----");
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        style={{
          width: 400,
          maxWidth: 400,
          height: 400,
        }}
        source={require("@/src/assets/animation/cartoonyoga.json")}
      />
    </View>
  );
};

export default AnimationScreen;
