import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const statsData = [
  { icon: '🏆', label: 'Current Streak', value: '7 days' },
  { icon: '⏱️', label: 'Total Time', value: '12h 30m' },
  { icon: '📊', label: 'Sessions', value: '24' },
  { icon: '🎯', label: 'Focus Score', value: '85%' },
];

const quickSessions = [
  { id: 1, duration: 5, title: 'Quick Calm', color: '#8B5CF6' },
  { id: 2, duration: 10, title: 'Mindful Break', color: '#06B6D4' },
  { id: 3, duration: 15, title: 'Deep Focus', color: '#10B981' },
  { id: 4, duration: 20, title: 'Stress Relief', color: '#F59E0B' },
];

export default function HomeScreen({ navigation }) {
  const [greeting, setGreeting] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const StatCard = ({ icon, label, value }) => (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const QuickSessionCard = ({ duration, title, color }) => (
    <TouchableOpacity 
      style={[styles.quickSessionCard, { backgroundColor: color }]}
      onPress={() => navigation.navigate('Timer', { duration })}
    >
      <Text style={styles.sessionDuration}>{duration}m</Text>
      <Text style={styles.sessionTitle}>{title}</Text>
      <View style={styles.playButton}>
        <Ionicons name="play" size={16} color={color} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, User! 👋</Text>
            <Text style={styles.subtitle}>Ready for your daily meditation?</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle" size={32} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Daily Quote Card */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' }}
          style={styles.quoteCard}
          imageStyle={styles.quoteCardImage}
        >
          <View style={styles.quoteOverlay}>
            <Text style={styles.quoteText}>
              "The present moment is the only time over which we have dominion."
            </Text>
            <Text style={styles.quoteAuthor}>- Thich Nhat Hanh</Text>
          </View>
        </ImageBackground>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsContainer}
          >
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </ScrollView>
        </View>

        {/* Quick Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Sessions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Timer')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sessionsContainer}
          >
            {quickSessions.map((session) => (
              <QuickSessionCard
                key={session.id}
                duration={session.duration}
                title={session.title}
                color={session.color}
              />
            ))}
          </ScrollView>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => navigation.navigate('SoundSettings')}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="musical-notes" size={24} color="#D97706" />
            </View>
            <Text style={styles.featureTitle}>Sounds</Text>
            <Text style={styles.featureDesc}>Ambient music</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => navigation.navigate('History')}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="time" size={24} color="#2563EB" />
            </View>
            <Text style={styles.featureTitle}>History</Text>
            <Text style={styles.featureDesc}>Past sessions</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => navigation.navigate('WeeklySummary')}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="bar-chart" size={24} color="#059669" />
            </View>
            <Text style={styles.featureTitle}>Insights</Text>
            <Text style={styles.featureDesc}>Weekly stats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="bed" size={24} color="#7C3AED" />
            </View>
            <Text style={styles.featureTitle}>Sleep</Text>
            <Text style={styles.featureDesc}>Bedtime stories</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  quoteCard: {
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  quoteCardImage: {
    borderRadius: 20,
  },
  quoteOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  quoteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  quoteAuthor: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  statsContainer: {
    gap: 12,
  },
  statCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIcon: {
    fontSize: 24,
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
  sessionsContainer: {
    gap: 15,
  },
  quickSessionCard: {
    width: 120,
    height: 140,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    marginRight: 12,
  },
  sessionDuration: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  featureCard: {
    width: (width - 64) / 2,
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
});