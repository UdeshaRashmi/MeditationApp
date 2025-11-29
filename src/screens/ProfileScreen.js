import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const profileStats = [
  { label: 'Meditation Streak', value: '7 days', icon: '🔥' },
  { label: 'Total Sessions', value: '24', icon: '📊' },
  { label: 'Minutes Meditated', value: '750', icon: '⏱️' },
  { label: 'Focus Level', value: '85%', icon: '🎯' },
];

const settingsOptions = [
  {
    title: 'Preferences',
    icon: 'settings-outline',
    items: [
      { label: 'Daily Reminders', type: 'switch', value: true },
      { label: 'Breathing Guides', type: 'switch', value: true },
      { label: 'Session Analytics', type: 'switch', value: false },
    ]
  },
  {
    title: 'Account',
    icon: 'person-outline',
    items: [
      { label: 'Edit Profile', type: 'navigation' },
      { label: 'Subscription', type: 'navigation' },
      { label: 'Data & Privacy', type: 'navigation' },
    ]
  },
  {
    title: 'Support',
    icon: 'help-circle-outline',
    items: [
      { label: 'Help Center', type: 'navigation' },
      { label: 'Contact Us', type: 'navigation' },
      { label: 'About Serenity', type: 'navigation' },
    ]
  }
];

export default function ProfileScreen({ navigation }) {
  const [settings, setSettings] = useState({
    dailyReminders: true,
    breathingGuides: true,
    sessionAnalytics: false,
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome')
        }
      ]
    );
  };

  const StatItem = ({ label, value, icon }) => (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const SettingItem = ({ item, section }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={() => {
        if (item.type === 'switch') {
          toggleSetting(item.label.toLowerCase().replace(' ', ''));
        }
      }}
    >
      <Text style={styles.settingLabel}>{item.label}</Text>
      
      {item.type === 'switch' ? (
        <Switch
          value={settings[item.label.toLowerCase().replace(' ', '')]}
          onValueChange={() => toggleSetting(item.label.toLowerCase().replace(' ', ''))}
          trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>Sarah Johnson</Text>
        <Text style={styles.userEmail}>sarah.j@example.com</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Journey</Text>
        <View style={styles.statsGrid}>
          {profileStats.map((stat, index) => (
            <StatItem
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </View>
      </View>

      {/* Settings Sections */}
      <View style={styles.settingsSection}>
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsGroup}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon} size={20} color="#6B7280" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <View style={styles.settingsList}>
              {section.items.map((item, itemIndex) => (
                <SettingItem
                  key={itemIndex}
                  item={item}
                  section={section}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social" size={20} color="#6B7280" />
          <Text style={styles.actionButtonText}>Share App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="star" size={20} color="#6B7280" />
          <Text style={styles.actionButtonText}>Rate App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={20} color="#6B7280" />
          <Text style={styles.actionButtonText}>Terms & Privacy</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#EF4444" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Serenity v2.1.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8FAFC',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editProfileText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  settingsSection: {
    padding: 20,
    gap: 24,
  },
  settingsGroup: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingsList: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  actionsSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 20,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});