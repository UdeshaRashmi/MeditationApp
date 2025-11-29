import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../services/api";

export default function HistoryScreen() {
  const [sessions, setSessions] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await api.get("/meditation/history");
      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation History</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Date: {new Date(item.date).toDateString()}</Text>
            <Text>Duration: {item.duration} sec</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  card: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 5,
  },
});
