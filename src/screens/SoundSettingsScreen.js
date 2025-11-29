import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const soundCategories = [
  {
    id: 1,
    title: 'Nature Sounds',
    icon: '🌿',
    sounds: [
      { id: 1, name: 'Gentle Rain', icon: '🌧️', duration: '∞', premium: false },
      { id: 2, name: 'Forest Birds', icon: '🐦', duration: '∞', premium: false },
      { id: 3, name: 'Ocean Waves', icon: '🌊', duration: '∞', premium: false },
      { id: 4, name: 'Mountain Stream', icon: '💧', duration: '∞', premium: true },
    ]
  },
  {
    id: 2,
    title: 'Ambient Music',
    icon: '🎵',
    sounds: [
      { id: 5, name: 'Crystal Singing', icon: '💎', duration: '∞', premium: false },
      { id: 6, name: 'Tibetan Bowl', icon: '🪘', duration: '∞', premium: false },
      { id: 7, name: 'Space Ambient', icon: '🚀', duration: '∞', premium: true },
      { id: 8, name: 'Piano Medley', icon: '🎹', duration: '∞', premium: true },
    ]
  },
  {
    id: 3,
    title: 'White Noise',
    icon: '🌀',
    sounds: [
      { id: 9, name: 'Pink Noise', icon: '🎯', duration: '∞', premium: false },
      { id: 10, name: 'Brown Noise', icon: '🟫', duration: '∞', premium: false },
      { id: 11, name: 'Fan Sound', icon: '💨', duration: '∞', premium: false },
      { id: 12, name: 'Air Conditioner', icon: '❄️', duration: '∞', premium: true },
    ]
  }
];

export default function SoundSettingsScreen({ navigation }) {
  const [selectedSounds, setSelectedSounds] = useState([]);
  const [volume, setVolume] = useState(0.7);
  const [fadeEnabled, setFadeEnabled] = useState(true);
  const [playingSound, setPlayingSound] = useState(null);

  const toggleSound = (soundId) => {
    if (selectedSounds.includes(soundId)) {
      setSelectedSounds(selectedSounds.filter(id => id !== soundId));
      if (playingSound === soundId) setPlayingSound(null);
    } else {
      setSelectedSounds([...selectedSounds, soundId]);
    }
  };

  const playSound = (soundId) => {
    setPlayingSound(playingSound === soundId ? null : soundId);
  };

  const SoundCard = ({ sound, category }) => (
    <View style={styles.soundCard}>
      <TouchableOpacity 
        style={styles.soundMain}
        onPress={() => playSound(sound.id)}
      >
        <View style={styles.soundHeader}>
          <Text style={styles.soundIcon}>{sound.icon}</Text>
          <View style={styles.soundInfo}>
            <Text style={styles.soundName}>{sound.name}</Text>
            <Text style={styles.soundDuration}>{sound.duration}</Text>
          </View>
        </View>
        
        <View style={styles.soundControls}>
          <TouchableOpacity 
            style={[
              styles.playButton,
              playingSound === sound.id && styles.playButtonActive
            ]}
            onPress={() => playSound(sound.id)}
          >
            <Ionicons 
              name={playingSound === sound.id ? "pause" : "play"} 
              size={16} 
              color={playingSound === sound.id ? "#fff" : "#8B5CF6"} 
            />
          </TouchableOpacity>
          
          <Switch
            value={selectedSounds.includes(sound.id)}
            onValueChange={() => toggleSound(sound.id)}
            trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
            thumbColor="#fff"
          />
        </View>
      </TouchableOpacity>
      
      {sound.premium && (
        <View style={styles.premiumBadge}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.premiumText}>Premium</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Volume Control */}
      <View style={styles.volumeSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="volume-high" size={24} color="#8B5CF6" />
          <Text style={styles.sectionTitle}>Volume</Text>
        </View>
        <View style={styles.volumeControl}>
          <Ionicons name="volume-low" size={20} color="#6B7280" />
          <Slider
            style={styles.volumeSlider}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <Ionicons name="volume-high" size={20} color="#6B7280" />
        </View>
        <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="timer-outline" size={20} color="#6B7280" />
            <Text style={styles.settingText}>Fade Out Ending</Text>
          </View>
          <Switch
            value={fadeEnabled}
            onValueChange={setFadeEnabled}
            trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="download-outline" size={20} color="#6B7280" />
            <Text style={styles.settingText}>Download for Offline</Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Sound Categories */}
      {soundCategories.map((category) => (
        <View key={category.id} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          
          <View style={styles.soundsGrid}>
            {category.sounds.map((sound) => (
              <SoundCard 
                key={sound.id} 
                sound={sound} 
                category={category}
              />
            ))}
          </View>
        </View>
      ))}

      {/* Premium Banner */}
      <View style={styles.premiumBanner}>
        <View style={styles.premiumContent}>
          <View style={styles.premiumIcon}>
            <Ionicons name="diamond" size={24} color="#F59E0B" />
          </View>
          <View style={styles.premiumTexts}>
            <Text style={styles.premiumTitle}>Unlock Premium Sounds</Text>
            <Text style={styles.premiumDescription}>
              Access 50+ exclusive sounds and advanced features
            </Text>
          </View>
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  volumeSection: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  volumeSlider: {
    flex: 1,
    height: 40,
  },
  volumeValue: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  settingsSection: {
    padding: 20,
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
  },
  categorySection: {
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  soundsGrid: {
    gap: 12,
  },
  soundCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  soundMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  soundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  soundIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  soundDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  soundControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
    borderRadius: 8,
    gap: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#D97706',
  },
  premiumBanner: {
    margin: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    padding: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumTexts: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  premiumButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  premiumButtonText: {
    color: '#8B5CF6',
    fontWeight: '600',
    fontSize: 14,
  },
});