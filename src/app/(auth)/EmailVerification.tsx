import { View, Text, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Button from "@/src/components/atoms/Button";
import PaperTextInput from "@/src/components/atoms/PaperTextInput";
import { useSignUp } from "@clerk/clerk-expo";
import CustomHeader from "@/src/components/atoms/CustomHeader";

const EmailVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [otpLoading, setOtpLoading] = useState(false);
  const [code, setCode] = useState("");

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setOtpLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        setOtpLoading(false);
        await setActive({ session: signUpAttempt.createdSessionId });

        Toast.show({
          type: "success",
          text1: "Sign Up Successful",
        });
        router.replace("/(main)/(tabs)/Index");
      } else {
        setOtpLoading(false);
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: "Invalid verification code. Please try again.",
        });
      }
    } catch (err: any) {
    //   console.log(JSON.stringify(err), "otp=====err");
      setOtpLoading(false);
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2:
          err?.errors?.[0]?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader title="Verification" onGoBack textAlign={"left"} />
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center" }}>
        <View className="mb-10 px-10">
          <Text className="text-lg font-bold">Verify Your Email</Text>
          <View>
            <PaperTextInput
              value={code}
              placeholder="Enter your verification code"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button
            loading={otpLoading}
            marginTop={20}
            name="Verify"
            onPress={onVerifyPress}
            disabled={code !== "" ? false : true}
          />
        </View>
      </KeyboardAvoidingView>

      <Toast />
      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default EmailVerification;
