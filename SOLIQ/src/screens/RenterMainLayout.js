import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VirtualSolarDashboardScreen from './VirtualSolarDashboardScreen';
import VirtualSolarMarketScreen from './VirtualSolarMarketScreen';
import VirtualSolarKhataScreen from './VirtualSolarKhataScreen';
import VirtualSolarSettingsScreen from './VirtualSolarSettingsScreen';

export default function RenterMainLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  // We will build Wallet, Khata, and Settings later as per user request.
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <VirtualSolarDashboardScreen onNavigateToMarket={() => setActiveTab('wallet')} />;
      case 'wallet':
        // For now, let's render Market here as part of Wallet logic, or just a placeholder until we build it
        return <VirtualSolarMarketScreen onProceed={() => setActiveTab('khata')} />;
      case 'khata':
        return <VirtualSolarKhataScreen />;
      case 'settings':
        return <VirtualSolarSettingsScreen onLogout={onLogout} />;
      default:
        return <VirtualSolarDashboardScreen onNavigateToMarket={() => setActiveTab('wallet')} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <NavItem 
          icon="flash" 
          label="Home" 
          isActive={activeTab === 'home'} 
          onPress={() => setActiveTab('home')} 
        />
        <NavItem 
          icon="wallet" 
          label="Wallet" 
          isActive={activeTab === 'wallet'} 
          onPress={() => setActiveTab('wallet')} 
        />
        <NavItem 
          icon="document-text" 
          label="Khata" 
          isActive={activeTab === 'khata'} 
          onPress={() => setActiveTab('khata')} 
        />
        <NavItem 
          icon="settings" 
          label="Settings" 
          isActive={activeTab === 'settings'} 
          onPress={() => setActiveTab('settings')} 
        />
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, isActive, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <Ionicons 
        name={isActive ? icon : `${icon}-outline`} 
        size={24} 
        color={isActive ? '#F9C449' : '#8A9BAE'} 
      />
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  screenContainer: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1E3A5F', // Premium dark blue to match SOLIQ brand
    height: Platform.OS === 'ios' ? 85 : 70,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#8A9BAE',
    marginTop: 4,
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#F9C449',
    fontWeight: '800',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF8EE',
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2A3A',
    marginTop: 16,
  },
  placeholderSub: {
    fontSize: 14,
    color: '#6B7A8D',
    marginTop: 8,
  }
});
