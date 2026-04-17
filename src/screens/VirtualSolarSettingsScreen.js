import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function VirtualSolarSettingsScreen({ onLogout }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoRecharge, setAutoRecharge] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Profile Summary Card */}
        <LinearGradient colors={['#1E3A5F', '#264A7A']} style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={32} color="#1E3A5F" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Digital Resident</Text>
              <Text style={styles.profileEmail}>renter@soliq.in</Text>
              <View style={styles.badgeWrap}>
                <Ionicons name="leaf" size={10} color="#4CAF50" />
                <Text style={styles.badgeText}>Eco Warrior</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconWrap, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="notifications" size={18} color="#1976D2" />
              </View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#CFD8DC', true: '#1E3A5F' }}
            />
          </View>
          
          <View style={styles.settingDivider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconWrap, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="flash-outline" size={18} color="#F57C00" />
              </View>
              <Text style={styles.settingLabel}>Auto-Recharge (Low Balance)</Text>
            </View>
            <Switch 
              value={autoRecharge} 
              onValueChange={setAutoRecharge}
              trackColor={{ false: '#CFD8DC', true: '#1E3A5F' }}
            />
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconWrap, { backgroundColor: '#ECEFF1' }]}>
                <Ionicons name="moon" size={18} color="#455A64" />
              </View>
              <Text style={styles.settingLabel}>Dark Mode (Coming Soon)</Text>
            </View>
            <Switch 
              value={darkModeEnabled} 
              onValueChange={setDarkModeEnabled}
              disabled={true}
              trackColor={{ false: '#CFD8DC', true: '#1E3A5F' }}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>SUPPORT & ABOUT</Text>

        <View style={styles.settingsGroup}>
          <SettingLink icon="help-buoy" iconColor="#00796B" bgColor="#E0F2F1" label="Help Center & FAQs" />
          <View style={styles.settingDivider} />
          <SettingLink icon="chatbubbles" iconColor="#512DA8" bgColor="#EDE7F6" label="Contact Support" />
          <View style={styles.settingDivider} />
          <SettingLink icon="document-text" iconColor="#C2185B" bgColor="#FCE4EC" label="Terms & Privacy Policy" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>SOLIQ App Version 1.0.0</Text>
        
        <View style={{height: 100}} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingLink({ icon, iconColor, bgColor, label }) {
  return (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#B0BEC5" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A2A3A' },
  scroll: { paddingHorizontal: 16 },
  
  profileCard: {
    padding: 20, borderRadius: 20, marginBottom: 24,
    shadowColor: '#1E3A5F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5
  },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  profileAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F9C449', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  profileEmail: { fontSize: 13, color: '#A0C4E8', marginBottom: 6 },
  badgeWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(76,175,80,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, color: '#4CAF50', fontWeight: '700', marginLeft: 4 },
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#6B7A8D', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  
  settingsGroup: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 24, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E8ECF0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 1
  },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#1A2A3A' },
  settingDivider: { height: 1, backgroundColor: '#F0F4F8', marginLeft: 66, marginRight: 16 },
  
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFEBEE', paddingVertical: 16, borderRadius: 16, marginBottom: 16
  },
  logoutText: { fontSize: 15, fontWeight: '800', color: '#D32F2F', marginLeft: 8 },
  versionText: { textAlign: 'center', fontSize: 11, color: '#8A9BAE', fontWeight: '500' }
});
