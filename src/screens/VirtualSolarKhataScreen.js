import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TRANSACTIONS = [
  { id: '1', date: '14 Apr 2026', plan: 'Standard Pack', price: 999, units: 150, status: 'Paid', invoice: 'INV-001' },
  { id: '2', date: '02 Mar 2026', plan: 'Mini Pack', price: 499, units: 70, status: 'Paid', invoice: 'INV-002' },
  { id: '3', date: '18 Feb 2026', plan: 'Urgent Recharge', price: 99, units: 14, status: 'Paid', invoice: 'INV-003' },
];

export default function VirtualSolarKhataScreen() {
  const [chartRange, setChartRange] = useState('Weekly'); // Hourly, Daily, Weekly, Monthly, Yearly
  
  // Dummy data arrays for visuals
  const chartDataMap = {
    Hourly: [1, 2, 4, 3, 5, 2, 1],
    Daily: [12, 15, 10, 22, 18, 14, 20],
    Weekly: [80, 120, 95, 110], // 4 weeks
    Monthly: [320, 410, 280, 390, 450, 300], // 6 months
    Yearly: [3500, 4200, 3800], // 3 years
  };

  const chartLabelsMap = {
    Hourly: ['8a', '10a', '12p', '2p', '4p', '6p', '8p'],
    Daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    Weekly: ['W1', 'W2', 'W3', 'W4'],
    Monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    Yearly: ['2024', '2025', '2026'],
  };

  const currentChartData = chartDataMap[chartRange];
  const currentChartLabels = chartLabelsMap[chartRange];
  
  // Max value to render max height correctly
  const maxDataVal = Math.max(...currentChartData);

  const handleDownloadPDF = (invoiceId) => {
    // Mocking a download action here
    alert(`Downloading ${invoiceId}.pdf...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bills & Khata</Text>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Ionicons name="filter" size={20} color="#1E3A5F" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Total Ledger Header */}
        <LinearGradient colors={['#1E3A5F', '#264A7A']} style={styles.ledgerCard}>
          <Text style={styles.ledgerLabel}>Total Digital Energy Purchased</Text>
          <Text style={styles.ledgerValue}>234 kWh</Text>
          <View style={styles.ledgerDivider} />
          <View style={styles.ledgerRow}>
            <View>
               <Text style={styles.ledgerSubLabel}>Total Spent</Text>
               <Text style={styles.ledgerSubValue}>₹1,597</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
               <Text style={styles.ledgerSubLabel}>Credits Used</Text>
               <Text style={styles.ledgerSubValue}>180.5 kWh</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Analytics Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Energy Usage Analysis</Text>
        </View>

        <View style={styles.analyticsCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
              <TouchableOpacity 
                key={range} 
                style={[styles.filterPill, chartRange === range && styles.filterPillActive]}
                onPress={() => setChartRange(range)}
              >
                <Text style={[styles.filterPillText, chartRange === range && styles.filterPillTextActive]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Chart Display */}
          <View style={styles.chartArea}>
            <View style={styles.barsContainer}>
              {currentChartData.map((val, idx) => {
                const heightPercentage = (val / maxDataVal) * 100;
                return (
                  <View key={idx} style={styles.barWrapper}>
                    <Text style={styles.barValTooltip}>{val}</Text>
                    <View style={[styles.barHoverable, { height: `${heightPercentage}%` }]}>
                      <LinearGradient colors={['#407FAC', '#264A7A']} style={styles.barInner} />
                    </View>
                    <Text style={styles.barLabel}>{currentChartLabels[idx]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Recent Purchases & Invoices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Purchases & e-Bills</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} style={styles.txCard}>
            <View style={styles.txIconWrap}>
              <Ionicons name="receipt" size={24} color="#1E3A5F" />
            </View>
            
            <View style={styles.txDetails}>
              <Text style={styles.txPlan}>{tx.plan}</Text>
              <Text style={styles.txDate}>{tx.date} • {tx.units} Units</Text>
              
              <TouchableOpacity 
                style={styles.pdfBtn}
                onPress={() => handleDownloadPDF(tx.invoice)}
                activeOpacity={0.7}
              >
                <Ionicons name="download-outline" size={12} color="#D84315" />
                <Text style={styles.pdfBtnText}>e-Bill PDF</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.txAmounts}>
              <Text style={styles.txPrice}>-₹{tx.price}</Text>
              <View style={styles.txStatusBadge}>
                <Text style={styles.txStatusText}>{tx.status}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{height: 100}} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A2A3A' },
  headerIconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDF2FC', justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingHorizontal: 16 },
  
  ledgerCard: {
    padding: 24, borderRadius: 20, marginBottom: 24,
    shadowColor: '#1E3A5F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5
  },
  ledgerLabel: { color: '#A0C4E8', fontSize: 13, marginBottom: 6 },
  ledgerValue: { color: '#FFFFFF', fontSize: 32, fontWeight: '800' },
  ledgerDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 20 },
  ledgerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  ledgerSubLabel: { color: '#A0C4E8', fontSize: 12, marginBottom: 4 },
  ledgerSubValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#1A2A3A', letterSpacing: 0.5 },
  seeAllText: { fontSize: 12, color: '#407FAC', fontWeight: '600' },

  analyticsCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#E8ECF0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 1
  },
  filterRow: { paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F0F4F8' },
  filterPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F0F4F8', marginRight: 10 },
  filterPillActive: { backgroundColor: '#1E3A5F' },
  filterPillText: { fontSize: 12, color: '#6B7A8D', fontWeight: '500' },
  filterPillTextActive: { color: '#FFFFFF', fontWeight: '700' },
  
  chartArea: { height: 160, marginTop: 20 },
  barsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20 },
  barWrapper: { alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: 30 },
  barValTooltip: { fontSize: 9, color: '#8A9BAE', marginBottom: 4, fontWeight: '500' },
  barHoverable: { width: 14, minHeight: '5%', borderRadius: 6, overflow: 'hidden', backgroundColor: '#EDF2FC' },
  barInner: { flex: 1, borderRadius: 6 },
  barLabel: { fontSize: 10, color: '#6B7A8D', marginTop: 8, fontWeight: '500' },

  txCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#E8ECF0', alignItems: 'center'
  },
  txIconWrap: { width: 46, height: 46, borderRadius: 12, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  txDetails: { flex: 1 },
  txPlan: { fontSize: 14, fontWeight: '700', color: '#1A2A3A', marginBottom: 4 },
  txDate: { fontSize: 11, color: '#6B7A8D', marginBottom: 8 },
  pdfBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pdfBtnText: { fontSize: 10, color: '#D84315', fontWeight: '700', marginLeft: 4 },
  
  txAmounts: { alignItems: 'flex-end' },
  txPrice: { fontSize: 16, fontWeight: '700', color: '#1A2A3A', marginBottom: 6 },
  txStatusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  txStatusText: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
});
