import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";

import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*,user:profiles(*)")
    .throwOnError();

  return data;
};

export default function App() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <>
          <Link
            href={"/new"}
            className="text-blue-500 p-4 text-center text-3xl"
          >
            New Post
          </Link>
        </>
      )}
    />
  );
}
