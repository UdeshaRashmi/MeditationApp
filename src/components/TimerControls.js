import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TimerControls({ onStart, onPause, onStop }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.btn} onPress={onStart}><Text style={styles.txt}>Start</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPause}><Text style={styles.txt}>Pause</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor:'#ff6b6b'}]} onPress={onStop}><Text style={styles.txt}>Stop</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', justifyContent:'space-around', marginTop:20 },
  btn: { backgroundColor:'#4b7cff', paddingVertical:12, paddingHorizontal:20, borderRadius:8 },
  txt: { color:'#fff', fontWeight:'700' }
});
