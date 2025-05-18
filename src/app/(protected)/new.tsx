import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createPost = async (content: string, user_id: string) => {
  const { data } = await supabase
    .from("posts")
    .insert({ content, user_id })
    .select("*")
    .throwOnError();

  return data;
};

const NewPostScreen = () => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(text, user!.id),
    onSuccess: (data) => {
      setText("");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      Alert.alert("Error!", error.message);
    },
  });

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
            onPress={() => mutate()}
            className={`${
              isPending ? "opacity-50" : ""
            } bg-white rounded-full p-4 px-6 self-end`}
            disabled={isPending}
          >
            <Text className="font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPostScreen;
