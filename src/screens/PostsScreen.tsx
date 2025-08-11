import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { fetchPosts, post } from "../../server/api";
import { useAsync } from "../hooks/useAsync";


export default function PostsScreen() {
    const { data: posts, loading, error } = useAsync<post[]>(fetchPosts);

    if (loading) {
      return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
}

if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        </SafeAreaView>
    )
}
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Posts</Text>
        <FlatList 
        data={posts} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.id}. {item.title}
          </Text>
        )}      
        />
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  item: { fontSize: 16, marginBottom: 8 },
  errorText: { color: "red", fontSize: 16 },
});