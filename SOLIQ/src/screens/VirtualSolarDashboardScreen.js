import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Animated, Easing, Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function VirtualSolarDashboardScreen({ onNavigateToMarket }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  // Dummy Chart Bars for Hour-wise Trend
  const chartData = [10, 25, 45, 60, 80, 50, 30, 15, 10]; // Representing usage across 9 hours

  return (
    <LinearGradient colors={['#FDF8EE', '#EDF5FB', '#FAFAFA']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.greeting}>Welcome, Digital Resident</Text>
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={20} color="#1E3A5F" />
              </View>
            </View>

            {/* Plan Usage Card */}
            <LinearGradient colors={['#1E3A5F', '#264A7A']} style={styles.planCard}>
              <View style={styles.planHeaderRow}>
                <Text style={styles.planTitle}>Current Plan: Standard Pack</Text>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              </View>
              
              <View style={styles.creditsRow}>
                <View>
                  <Text style={styles.creditsLabel}>Remaining Credits</Text>
                  <Text style={styles.creditsValue}>48.5 <Text style={styles.creditsUnit}>kWh</Text></Text>
                </View>
                <View style={styles.chartCircleWrapper}>
                  <View style={styles.chartCircleInner}>
                    <Text style={styles.chartPercentage}>32%</Text>
                    <Text style={styles.chartPercentageSub}>Left</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.usageText}>You have used 101.5 kWh of 150 kWh this month.</Text>
            </LinearGradient>

            {/* Metrics Grid */}
            <Text style={styles.sectionTitle}>LIVE ELECTRICAL PARAMETERS</Text>
            <View style={styles.grid}>
              <MetricItem icon="flash" title="Voltage" value="238.4" unit="V" />
              <MetricItem icon="flash-outline" title="Current" value="2.3" unit="A" />
              <MetricItem icon="speedometer-outline" title="Power" value="0.55" unit="kW" />
              <MetricItem icon="analytics-outline" title="Energy" value="4.2" unit="kWh" />
              <MetricItem icon="pulse-outline" title="Frequency" value="50.02" unit="Hz" />
              <MetricItem icon="options-outline" title="Power Factor" value="0.98" unit="PF" />
            </View>

            {/* Trend Graph */}
            <Text style={styles.sectionTitle}>HOURLY USAGE TREND (TODAY)</Text>
            <View style={styles.graphCard}>
              <View style={styles.barsContainer}>
                {chartData.map((val, idx) => (
                  <View key={idx} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: val }]} />
                    <Text style={styles.barLabel}>{idx + 8}h</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Suggestion & Pack Buy */}
            <View style={styles.suggestionBox}>
              <LinearGradient colors={['#FFF3E0', '#FFE0B2']} style={styles.suggestionGradient}>
                <View style={styles.suggestionTop}>
                  <Ionicons name="bulb" size={24} color="#E65100" />
                  <Text style={styles.suggestionTitle}>Smart Usage Suggestion</Text>
                </View>
                <Text style={styles.suggestionDesc}>
                  Your energy usage is slightly higher than usual. Based on your trend, you might run out of credits in 4 days.
                </Text>
                
                <TouchableOpacity 
                  style={styles.suggestionBtn} 
                  onPress={onNavigateToMarket}
                  activeOpacity={0.8}
                >
                  <Text style={styles.suggestionBtnText}>Explore Plans & Recharge</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Log Out */}
            <View style={{ marginBottom: 30 }} />

          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function MetricItem({ icon, title, value, unit }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconWrap}>
        <Ionicons name={icon} size={20} color="#264A7A" />
      </View>
      <Text style={styles.metricTitle}>{title}</Text>
      <View style={styles.metricValRow}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricUnit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#1A2A3A' },
  profileIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EDF2FC', justifyContent: 'center', alignItems: 'center' },
  planCard: { borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#1E3A5F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  planHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  planTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  activeBadge: { backgroundColor: 'rgba(76, 175, 80, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#4CAF50' },
  activeBadgeText: { color: '#4CAF50', fontSize: 10, fontWeight: '800' },
  creditsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  creditsLabel: { color: '#A0C4E8', fontSize: 12, marginBottom: 4 },
  creditsValue: { color: '#FFFFFF', fontSize: 32, fontWeight: '800' },
  creditsUnit: { fontSize: 16, color: '#FFFFFF', fontWeight: '500' },
  chartCircleWrapper: { width: 64, height: 64, borderRadius: 32, borderWidth: 6, borderColor: '#F9C449', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3A5F' },
  chartPercentage: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  chartPercentageSub: { color: '#A0C4E8', fontSize: 9 },
  usageText: { color: '#A0C4E8', fontSize: 11, marginTop: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#6B7A8D', letterSpacing: 1, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  metricCard: { width: (width - 44) / 2, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E8ECF0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 1 },
  metricIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F0F6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricTitle: { fontSize: 12, color: '#6B7A8D', marginBottom: 4 },
  metricValRow: { flexDirection: 'row', alignItems: 'flex-end' },
  metricValue: { fontSize: 18, fontWeight: '800', color: '#1A2A3A' },
  metricUnit: { fontSize: 12, color: '#6B7A8D', marginLeft: 4, marginBottom: 2 },
  graphCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: '#E8ECF0' },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, paddingTop: 10 },
  barWrapper: { alignItems: 'center' },
  bar: { width: 14, backgroundColor: '#264A7A', borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 10, color: '#6B7A8D', marginTop: 8 },
  suggestionBox: { overflow: 'hidden', borderRadius: 16, marginBottom: 24, shadowColor: '#E65100', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  suggestionGradient: { padding: 20 },
  suggestionTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  suggestionTitle: { fontSize: 15, fontWeight: '800', color: '#E65100', marginLeft: 8 },
  suggestionDesc: { fontSize: 13, color: '#D84315', lineHeight: 18, marginBottom: 16 },
  suggestionBtn: { backgroundColor: '#E65100', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 24 },
  suggestionBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13, marginRight: 6 },
});
