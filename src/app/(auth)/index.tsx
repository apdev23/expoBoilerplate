import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Button from "@/src/components/atoms/Button";
import PaperTextInput from "@/src/components/atoms/PaperTextInput";
import colors from "@/tailwind-config/colors";
import { useSignIn } from "@clerk/clerk-expo";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();
  const [loader, serLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignInPress = React.useCallback(
    async (data: any) => {
      serLoader(true);
      if (!isLoaded) return;
      const password = data?.password;
      try {
        const signInAttempt = await signIn.create({
          identifier: data?.email,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          serLoader(false);

          Toast.show({
            type: "success",
            text1: "Sign In Successful",
            text2: `Welcome back!`,
          });
          router.replace("/(main)/(tabs)/Index");
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
          serLoader(false);
        }
      } catch (err) {
        serLoader(false);
        Toast.show({
          type: "error",
          text1: "Sign In Failed",
          text2:
            err?.errors[0]?.message ||
            "Something went wrong. Please try again.",
        });
      }
    },
    [control, isLoaded]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-1 mx-9 mt-10">
            <View className="self-center mt-10 mb-10 ">
              <Image
                source={require("@/src/assets/images/logo.png")}
                className="w-28 h-28 rounded-lg overflow-hidden"
              />
            </View>

            <Text className="font-Secondary_Font_Bold text-black text-2xl">
              Welcome Back!
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  placeholder="email@address.com"
                  onBlur={() => {
                    onBlur();
                    trigger("email");
                  }}
                  onChangeText={(text) => {
                    onChange(text.trim());
                  }}
                  label={"Email"}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  outlineStyle={{
                    borderColor: errors?.email ? "red" : colors.primary.dark,
                  }}
                  activeOutlineColor={
                    errors?.email ? "red" : colors.primary.dark
                  }
                  hasErrors={errors?.email ? true : false}
                  errorMsg={errors?.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  placeholder="Password"
                  onBlur={() => {
                    onBlur();
                    trigger("password");
                  }}
                  label={"Password"}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    onChange(text);
                    trigger("password");
                  }}
                  value={value}
                  secureTextEntry={!showPassword}
                  outlineStyle={{
                    borderColor: errors?.password ? "red" : colors.primary.dark,
                  }}
                  activeOutlineColor={
                    errors?.password ? "red" : colors.primary.dark
                  }
                  isPass={true}
                  hasErrors={errors?.password ? true : false}
                  errorMsg={errors?.password?.message}
                />
              )}
            />
            <Pressable>
              <Text className="text-secondary-BLUEBERRY no-underline text-sm pt-3">
                Forgot your Password?
              </Text>
            </Pressable>

            <Button
              onPress={handleSubmit(onSignInPress)}
              // onPress={() => router.replace("/(main)/(tabs)/Index")}
              name="Sign In"
              marginTop={36}
              loading={loader}
            />

            <View className="flex-row items-center mt-14 pb-14">
              <Text className="font-Secondary_Font_Regular text-black text-sm">
                You haven't account?{"  "}
              </Text>
              <Link href={"/(auth)/Register"} asChild>
                <Pressable>
                  <Text className="font-Secondary_Font_SemiBold text-sm text-secondary-BLUEBERRY no-underline">
                    Create an account
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
      <StatusBar translucent={true} backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default Login;
