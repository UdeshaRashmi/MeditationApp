import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample meditation session data
const meditationSessions = [
  {
    id: 1,
    duration: 15,
    date: '2024-01-15T10:30:00',
    type: 'Mindfulness',
    mood: 'calm',
    focusScore: 85
  },
  {
    id: 2,
    duration: 10,
    date: '2024-01-14T08:15:00',
    type: 'Breathing',
    mood: 'focused',
    focusScore: 92
  },
  {
    id: 3,
    duration: 20,
    date: '2024-01-13T19:45:00',
    type: 'Sleep',
    mood: 'relaxed',
    focusScore: 78
  },
  {
    id: 4,
    duration: 5,
    date: '2024-01-12T12:00:00',
    type: 'Quick Calm',
    mood: 'energized',
    focusScore: 88
  },
  {
    id: 5,
    duration: 30,
    date: '2024-01-11T06:30:00',
    type: 'Deep Focus',
    mood: 'balanced',
    focusScore: 95
  },
  {
    id: 6,
    duration: 15,
    date: '2024-01-10T21:00:00',
    type: 'Stress Relief',
    mood: 'peaceful',
    focusScore: 82
  },
  {
    id: 7,
    duration: 25,
    date: '2024-01-09T17:20:00',
    type: 'Mindfulness',
    mood: 'centered',
    focusScore: 90
  },
];

const moodIcons = {
  calm: '😌',
  focused: '🎯',
  relaxed: '😊',
  energized: '⚡',
  balanced: '⚖️',
  peaceful: '🕊️',
  centered: '🎯',
};

const typeColors = {
  'Mindfulness': '#8B5CF6',
  'Breathing': '#06B6D4',
  'Sleep': '#10B981',
  'Quick Calm': '#F59E0B',
  'Deep Focus': '#EF4444',
  'Stress Relief': '#EC4899',
};

export default function HistoryScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredSessions = meditationSessions.filter(session => {
    if (filter === 'all') return true;
    return session.type.toLowerCase().includes(filter.toLowerCase());
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'duration') {
      return b.duration - a.duration;
    }
    return 0;
  });

  const getTotalStats = () => {
    const totalSessions = meditationSessions.length;
    const totalMinutes = meditationSessions.reduce((sum, session) => sum + session.duration, 0);
    const averageScore = Math.round(meditationSessions.reduce((sum, session) => sum + session.focusScore, 0) / totalSessions);
    
    return { totalSessions, totalMinutes, averageScore };
  };

  const { totalSessions, totalMinutes, averageScore } = getTotalStats();

  const SessionCard = ({ session }) => {
    const date = new Date(session.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return (
      <Animated.View style={[styles.sessionCard, { opacity: fadeAnim }]}>
        <View style={styles.sessionHeader}>
          <View style={[styles.typeBadge, { backgroundColor: typeColors[session.type] }]}>
            <Text style={styles.typeText}>{session.type}</Text>
          </View>
          <Text style={styles.duration}>{session.duration}m</Text>
        </View>
        
        <View style={styles.sessionBody}>
          <View style={styles.dateInfo}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.time}>{formattedTime}</Text>
          </View>
          
          <View style={styles.moodSection}>
            <Text style={styles.moodIcon}>{moodIcons[session.mood]}</Text>
            <Text style={styles.moodText}>{session.mood}</Text>
          </View>
        </View>
        
        <View style={styles.sessionFooter}>
          <View style={styles.scoreContainer}>
            <Ionicons name="trending-up" size={16} color="#10B981" />
            <Text style={styles.scoreText}>{session.focusScore}% Focus</Text>
          </View>
          
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const FilterButton = ({ title, value, isActive }) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsHeader}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{averageScore}%</Text>
          <Text style={styles.statLabel}>Avg Focus</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <FilterButton title="All" value="all" isActive={filter === 'all'} />
        <FilterButton title="Mindfulness" value="mindfulness" isActive={filter === 'mindfulness'} />
        <FilterButton title="Breathing" value="breathing" isActive={filter === 'breathing'} />
        <FilterButton title="Sleep" value="sleep" isActive={filter === 'sleep'} />
        <FilterButton title="Quick" value="quick" isActive={filter === 'quick'} />
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]}
          onPress={() => setSortBy('date')}
        >
          <Text style={[styles.sortText, sortBy === 'date' && styles.sortTextActive]}>
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'duration' && styles.sortButtonActive]}
          onPress={() => setSortBy('duration')}
        >
          <Text style={[styles.sortText, sortBy === 'duration' && styles.sortTextActive]}>
            Duration
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sessions List */}
      <ScrollView
        style={styles.sessionsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No sessions found</Text>
            <Text style={styles.emptyText}>
              {filter === 'all' 
                ? "You haven't completed any meditation sessions yet."
                : `No ${filter} sessions found.`
              }
            </Text>
            <TouchableOpacity 
              style={styles.startSessionButton}
              onPress={() => navigation.navigate('Timer')}
            >
              <Text style={styles.startSessionText}>Start Your First Session</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Export Button */}
      <TouchableOpacity style={styles.exportButton}>
        <Ionicons name="download" size={20} color="#fff" />
        <Text style={styles.exportText}>Export Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sortLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 12,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  sortTextActive: {
    color: '#fff',
  },
  sessionsList: {
    flex: 1,
    padding: 20,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  duration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sessionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateInfo: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    color: '#6B7280',
  },
  moodSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodIcon: {
    fontSize: 20,
  },
  moodText: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  startSessionButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  startSessionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footerSpace: {
    height: 80,
  },
  exportButton: {
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
  exportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});