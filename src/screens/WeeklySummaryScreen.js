import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Sample weekly data
const weeklyData = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  minutes: [15, 20, 10, 25, 15, 30, 20],
  sessions: [2, 3, 1, 2, 2, 4, 3],
  focus: [85, 90, 78, 92, 88, 95, 86],
};

const meditationTypes = [
  { name: 'Mindfulness', minutes: 45, color: '#8B5CF6', percentage: 30 },
  { name: 'Breathing', minutes: 35, color: '#06B6D4', percentage: 23 },
  { name: 'Sleep', minutes: 40, color: '#10B981', percentage: 27 },
  { name: 'Quick Calm', minutes: 30, color: '#F59E0B', percentage: 20 },
];

const achievements = [
  { id: 1, title: '7-Day Streak', description: 'Meditated for 7 consecutive days', icon: '🔥', unlocked: true },
  { id: 2, title: 'Early Bird', description: '5 morning sessions before 8 AM', icon: '🌅', unlocked: true },
  { id: 3, title: 'Focus Master', description: 'Average focus score above 90%', icon: '🎯', unlocked: false },
  { id: 4, title: 'Marathon', description: 'Completed a 30-minute session', icon: '🏃‍♂️', unlocked: true },
];

export default function WeeklySummaryScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const totalMinutes = weeklyData.minutes.reduce((sum, min) => sum + min, 0);
  const totalSessions = weeklyData.sessions.reduce((sum, session) => sum + session, 0);
  const averageFocus = Math.round(weeklyData.focus.reduce((sum, focus) => sum + focus, 0) / weeklyData.focus.length);
  const streak = 7; // Current streak

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#8B5CF6',
    },
  };

  const OverviewTab = () => (
    <Animated.View style={[styles.tabContent, { opacity: fadeAnim }]}>
      {/* Weekly Progress Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <LineChart
          data={{
            labels: weeklyData.days,
            datasets: [
              {
                data: weeklyData.minutes,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={width - 80}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Session Distribution */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Session Types</Text>
        <PieChart
          data={meditationTypes}
          width={width - 80}
          height={150}
          chartConfig={chartConfig}
          accessor="minutes"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Type Breakdown */}
      <View style={styles.typesSection}>
        {meditationTypes.map((type, index) => (
          <View key={index} style={styles.typeItem}>
            <View style={styles.typeHeader}>
              <View style={[styles.typeColor, { backgroundColor: type.color }]} />
              <Text style={styles.typeName}>{type.name}</Text>
            </View>
            <View style={styles.typeStats}>
              <Text style={styles.typeMinutes}>{type.minutes}m</Text>
              <Text style={styles.typePercentage}>({type.percentage}%)</Text>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  const StatsTab = () => (
    <Animated.View style={[styles.tabContent, { opacity: fadeAnim }]}>
      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Ionicons name="time" size={24} color="#8B5CF6" />
          <Text style={styles.metricValue}>{totalMinutes}m</Text>
          <Text style={styles.metricLabel}>Total Time</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="play" size={24} color="#06B6D4" />
          <Text style={styles.metricValue}>{totalSessions}</Text>
          <Text style={styles.metricLabel}>Sessions</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="trending-up" size={24} color="#10B981" />
          <Text style={styles.metricValue}>{averageFocus}%</Text>
          <Text style={styles.metricLabel}>Avg Focus</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="flame" size={24} color="#F59E0B" />
          <Text style={styles.metricValue}>{streak}</Text>
          <Text style={styles.metricLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Daily Breakdown */}
      <View style={styles.dailySection}>
        <Text style={styles.sectionTitle}>Daily Breakdown</Text>
        <BarChart
          data={{
            labels: weeklyData.days,
            datasets: [
              {
                data: weeklyData.sessions,
              },
            ],
          }}
          width={width - 80}
          height={200}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
          }}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </View>

      {/* Focus Trends */}
      <View style={styles.focusSection}>
        <Text style={styles.sectionTitle}>Focus Trends</Text>
        <View style={styles.focusChart}>
          {weeklyData.focus.map((score, index) => (
            <View key={index} style={styles.focusBarContainer}>
              <View style={styles.focusBarBackground}>
                <View 
                  style={[
                    styles.focusBar, 
                    { 
                      height: `${score}%`,
                      backgroundColor: score >= 90 ? '#10B981' : score >= 80 ? '#F59E0B' : '#EF4444'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.focusDay}>{weeklyData.days[index]}</Text>
              <Text style={styles.focusScore}>{score}%</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );

  const AchievementsTab = () => (
    <Animated.View style={[styles.tabContent, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Your Achievements</Text>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              !achievement.unlocked && styles.achievementCardLocked
            ]}
          >
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
              {!achievement.unlocked && (
                <View style={styles.lockOverlay}>
                  <Ionicons name="lock-closed" size={16} color="#fff" />
                </View>
              )}
            </View>
            <View style={styles.achievementInfo}>
              <Text style={[
                styles.achievementTitle,
                !achievement.unlocked && styles.achievementTitleLocked
              ]}>
                {achievement.title}
              </Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            {achievement.unlocked && (
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            )}
          </View>
        ))}
      </View>

      {/* Progress Summary */}
      <View style={styles.progressSummary}>
        <Text style={styles.summaryTitle}>Weekly Summary</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Achievements Unlocked</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryNumber}>75%</Text>
            <Text style={styles.summaryLabel}>Weekly Goal</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryNumber}>12%</Text>
            <Text style={styles.summaryLabel}>Progress vs Last Week</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Insights</Text>
        <Text style={styles.subtitle}>January 8-14, 2024</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'stats' && styles.tabActive]}
          onPress={() => setSelectedTab('stats')}
        >
          <Text style={[styles.tabText, selectedTab === 'stats' && styles.tabTextActive]}>
            Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && <OverviewTab />}
        {selectedTab === 'stats' && <StatsTab />}
        {selectedTab === 'achievements' && <AchievementsTab />}
        
        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share" size={20} color="#fff" />
        <Text style={styles.shareText}>Share Progress</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  chartSection: {
    marginBottom: 30,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  typesSection: {
    gap: 12,
  },
  typeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  typeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeMinutes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  typePercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  metricCard: {
    width: (width - 64) / 2,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  dailySection: {
    marginBottom: 30,
  },
  focusSection: {
    marginBottom: 20,
  },
  focusChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  focusBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  focusBarBackground: {
    height: 80,
    width: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  focusBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 8,
  },
  focusDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  focusScore: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1F2937',
  },
  achievementsGrid: {
    gap: 12,
    marginBottom: 30,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  achievementEmoji: {
    fontSize: 20,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: '#6B7280',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressSummary: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  footerSpace: {
    height: 80,
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});