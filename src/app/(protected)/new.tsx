import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

const NewPostScreen = () => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text) return;

    const { data, error } = await supabase.from("posts").insert({
      content: text,
      user_id: user?.id,
    });

    if (error) console.error(error);

    setText("");

    router.replace("/(protected)/");
  };

  return (
    <SafeAreaView edges={["bottom"]} className="p-4 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
        <TextInput
          placeholder="Whats is your on mind ? "
          className="text-white text-lg"
          onChangeText={setText}
          multiline
          numberOfLines={4}
          keyboardAppearance="default"
          placeholderTextColor={"gray"}
        />

        <View className="mt-auto">
          <Pressable
            onPress={onSubmit}
            className="bg-white rounded-full p-4 px-6 self-end"
          >
            <Text className="font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPostScreen;
