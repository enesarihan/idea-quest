import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter a email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-neutral-950 px-4">
      <View className="w-full max-w-sm bg-neutral-900 rounded-2xl shadow-lg p-8">
        {/* Logo or Icon */}
        <View className="items-center mb-8">
          <FontAwesome name="fire-extinguisher" className="w-16 h-16 mb-2" />
          <Text className="text-3xl font-bold text-white tracking-wide">
            Welcome Back
          </Text>
          <Text className="text-neutral-400 mt-1 text-base">
            Sign in to continue
          </Text>
        </View>

        <View className="gap-5">
          <View>
            <Text className="text-sm font-semibold text-neutral-300 mb-2">
              Email
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:border-white"
              placeholder="Enter your email"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              autoFocus
            />
          </View>

          <View>
            <Text className="text-sm font-semibold text-neutral-300 mb-2">
              Password
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:border-white"
              placeholder="Enter your password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className={`w-full py-3 rounded-xl mt-4 ${
              isLoading ? "bg-white opacity-70" : "bg-white active:bg-white"
            }`}
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-black text-center font-semibold text-lg">
              {isLoading ? "Logging in..." : "Sign in"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-neutral-400">Don't have an account? </Text>
            <Link href="/signup" asChild>
              <Pressable>
                <Text className="text-blue-400 font-medium">Create one</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
