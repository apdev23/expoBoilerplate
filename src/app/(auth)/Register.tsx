import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
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
import CheckboxComponent from "@/src/components/atoms/CheckBoxComponent";
import PaperTextInput from "@/src/components/atoms/PaperTextInput";
import colors from "@/tailwind-config/colors";
import { useSignUp } from "@clerk/clerk-expo";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle Sign-Up
  const onSignUpPress = async (data: any) => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: data.email.trim(),
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/(auth)/EmailVerification");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: "Sign Up Failed",
        text2:
          err?.errors?.[0]?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView className="flex-1">
          <View className="flex-1 mx-9 mt-10">
            <View className="self-center mt-10 mb-10">
              <Image
                source={require("@/src/assets/images/logo.png")}
                className="w-28 h-28 rounded-lg overflow-hidden"
              />
            </View>

            <Text className="font-Secondary_Font_Bold text-black text-2xl">
              Create Account
            </Text>

            {/* Email Input */}
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
                  label="Email"
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  outlineStyle={{
                    borderColor: errors?.email ? "red" : colors.primary.dark,
                  }}
                  activeOutlineColor={
                    errors?.email ? "red" : colors.primary.dark
                  }
                  hasErrors={!!errors?.email}
                  errorMsg={errors?.email?.message}
                />
              )}
            />

            {/* Password Input */}
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
                  label="Password"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  outlineStyle={{
                    borderColor: errors?.password ? "red" : colors.primary.dark,
                  }}
                  activeOutlineColor={
                    errors?.password ? "red" : colors.primary.dark
                  }
                  isPass
                  hasErrors={!!errors?.password}
                  errorMsg={errors?.password?.message}
                />
              )}
            />

            {/* Terms & Conditions */}
            <View className="flex-row items-start mt-8">
              <CheckboxComponent
                checked={isChecked}
                onToggle={setChecked}
                color={"#5D7EFC"}
              />
              <View>
                <View className="flex-row align-top">
                  <Text className="font-Secondary_Font_Regular text-sm text-black">
                    I agree to the{" "}
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-secondary-BLUEBERRY no-underline text-sm">
                      Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row align-top">
                  <Text className="font-Secondary_Font_Regular text-sm text-black">
                    and{"  "}
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-secondary-BLUEBERRY no-underline text-sm">
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Button
              onPress={handleSubmit(onSignUpPress)}
              name="Create Account"
              marginTop={36}
              loading={loading}
            />

            <View className="flex-row items-center mt-14 pb-14">
              <Text className="text-sm text-black">
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)" asChild>
                <Pressable>
                  <Text className="text-sm text-secondary-BLUEBERRY font-semibold">
                    Sign In
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default Register;
