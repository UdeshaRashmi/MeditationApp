import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Timer")}
      >
        <Text style={styles.btnText}>Start Meditation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.btnText}>Meditation History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Summary")}
      >
        <Text style={styles.btnText}>Weekly Summary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.btnText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 32, textAlign: "center", marginBottom: 40, fontWeight: "bold" },
  button: {
    backgroundColor: "#6C63FF",
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
