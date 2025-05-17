import { View, Text } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        onPress={() => supabase.auth.signOut()}
        className="text-2xl font-bold text-white"
      >
        Sign out
      </Text>
    </View>
  );
};

export default ProfileScreen;
