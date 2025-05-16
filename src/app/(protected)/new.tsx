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

const NewPostScreen = () => {
  const [text, setText] = useState("");

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
        />

        <View className="mt-auto">
          <Pressable
            onPress={() => console.log("post : ", text)}
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
