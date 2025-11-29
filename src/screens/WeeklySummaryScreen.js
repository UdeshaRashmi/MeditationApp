import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../services/api";

export default function WeeklySummaryScreen() {
  const [summary, setSummary] = useState([]);

  const loadSummary = async () => {
    try {
      const res = await api.get("/meditation/weekly");
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Summary</Text>

      <FlatList
        data={summary}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Date: {item._id}</Text>
            <Text>Total Duration: {item.totalDuration} sec</Text>
            <Text>Sessions: {item.count}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 10,
  },
});
