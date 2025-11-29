import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Vibration,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const backgroundSounds = [
  { id: 1, name: 'Rain', icon: '🌧️', sound: 'rain' },
  { id: 2, name: 'Forest', icon: '🌲', sound: 'forest' },
  { id: 3, name: 'Waves', icon: '🌊', sound: 'waves' },
  { id: 4, name: 'White Noise', icon: '🌀', sound: 'white_noise' },
];

export default function TimerScreen({ navigation, route }) {
  const [duration, setDuration] = useState(route.params?.duration || 10);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef(null);

  const totalSeconds = duration * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const completeSession = () => {
    Vibration.vibrate([0, 500, 200, 500]);
    setIsRunning(false);
    Alert.alert(
      'Session Complete! 🎉',
      `You've completed ${duration} minutes of meditation`,
      [
        {
          text: 'Save Session',
          onPress: () => navigation.goBack(),
          style: 'default'
        },
        {
          text: 'Continue',
          style: 'cancel'
        }
      ]
    );
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    animateBreath();
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    progressAnim.setValue(0);
  };

  const animateBreath = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isRunning) animateBreath();
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = width * 0.35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation Timer</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Ionicons name="settings-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Progress Circle */}
      <View style={styles.timerContainer}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.breathCircle, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.statusText}>
              {isRunning ? 'Breathing...' : isPaused ? 'Paused' : 'Ready to Begin'}
            </Text>
          </Animated.View>
          
          <Animated.View style={styles.progressRing}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }
              ]} 
            />
          </Animated.View>
        </View>
      </View>

      {/* Duration Slider */}
      {!isRunning && !isPaused && (
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Duration: {duration} minutes</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={60}
            step={1}
            value={duration}
            onValueChange={setDuration}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <View style={styles.durationPresets}>
            {[5, 10, 15, 20, 30].map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[
                  styles.presetButton,
                  duration === preset && styles.presetButtonActive
                ]}
                onPress={() => {
                  setDuration(preset);
                  setTimeLeft(preset * 60);
                }}
              >
                <Text style={[
                  styles.presetText,
                  duration === preset && styles.presetTextActive
                ]}>
                  {preset}m
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Sound Settings */}
      {showSettings && (
        <Animated.View style={styles.soundSettings}>
          <Text style={styles.soundSettingsTitle}>Background Sounds</Text>
          <View style={styles.soundGrid}>
            {backgroundSounds.map((sound) => (
              <TouchableOpacity
                key={sound.id}
                style={[
                  styles.soundButton,
                  selectedSound === sound.sound && styles.soundButtonActive
                ]}
                onPress={() => setSelectedSound(
                  selectedSound === sound.sound ? null : sound.sound
                )}
              >
                <Text style={styles.soundIcon}>{sound.icon}</Text>
                <Text style={styles.soundName}>{sound.name}</Text>
                {selectedSound === sound.sound && (
                  <View style={styles.soundActiveIndicator}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        {!isRunning && !isPaused ? (
          <TouchableOpacity style={styles.startButton} onPress={startTimer}>
            <Ionicons name="play" size={32} color="#fff" />
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
              <Ionicons name="refresh" size={24} color="#6B7280" />
              <Text style={styles.controlButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.mainControlButton} 
              onPress={isRunning ? pauseTimer : startTimer}
            >
              <Ionicons 
                name={isRunning ? "pause" : "play"} 
                size={32} 
                color="#fff" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => navigation.navigate('SoundSettings')}
            >
              <Ionicons name="musical-notes" size={24} color="#6B7280" />
              <Text style={styles.controlButtonText}>Sounds</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Breathing Guide */}
      {isRunning && (
        <View style={styles.breathingGuide}>
          <Text style={styles.breathingText}>
            {scaleAnim._value > 1.1 ? 'Breathe In...' : 'Breathe Out...'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressRing: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
  },
  progressFill: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    borderWidth: 8,
    borderColor: '#8B5CF6',
    borderTopColor: '#8B5CF6',
    borderRightColor: '#8B5CF6',
    borderBottomColor: '#8B5CF6',
    borderLeftColor: '#E5E7EB',
    transform: [{ rotate: '-45deg' }],
  },
  sliderContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  durationPresets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  presetButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  presetText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  presetTextActive: {
    color: '#fff',
  },
  soundSettings: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  soundSettingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soundButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  soundButtonActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  soundIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  soundName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  soundActiveIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 25,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    padding: 16,
  },
  mainControlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  controlButtonText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  breathingGuide: {
    alignItems: 'center',
    marginBottom: 30,
  },
  breathingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8B5CF6',
  },
});