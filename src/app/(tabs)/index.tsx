import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { dummyPosts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";

export default function App() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
