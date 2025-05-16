import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text className="text-6xl text-red-600 font-bold">Feed</Text>
      <StatusBar style="auto" />
    </View>
  );
}
