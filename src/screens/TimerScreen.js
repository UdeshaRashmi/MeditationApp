import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api";

export default function TimerScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const saveSession = async () => {
    try {
      await api.post("/meditation/save-session", { duration: seconds });
      alert("Meditation Session Saved!");
      navigation.goBack();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{seconds}s</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setRunning(!isRunning)}
      >
        <Text style={styles.btnText}>{isRunning ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF6B6B" }]}
        onPress={saveSession}
      >
        <Text style={styles.btnText}>Finish & Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  timer: { fontSize: 48, marginBottom: 40, fontWeight: "bold" },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    width: "60%",
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
