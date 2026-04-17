import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Smart WiFi Plug',
    desc: 'Monitor real-time device power consumption.',
    image: require('../../assets/smart_plug.png'),
    originalPrice: 899,
    coinPriceLabel: 'Use 200 Coins for ₹699'
  },
  {
    id: 'p2',
    name: 'Energy Monitor',
    desc: 'Clamp-on whole-home digital smart meter.',
    image: require('../../assets/energy_meter.png'),
    originalPrice: 2499,
    coinPriceLabel: 'Use 500 Coins for ₹1999'
  },
  {
    id: 'p3',
    name: 'Power Station',
    desc: 'Mini 300W portable backup bank.',
    image: require('../../assets/portable_power.png'),
    originalPrice: 8990,
    coinPriceLabel: 'Use 1000 Coins for ₹7990'
  },
  {
    id: 'p4',
    name: 'Smart LED Bulb',
    desc: 'Energy efficient dimmable lighting.',
    image: require('../../assets/smart_bulb.png'),
    originalPrice: 450,
    coinPriceLabel: 'Use 100 Coins for ₹350'
  }
];

export default function VirtualHardwareMarketScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#1E3A5F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hardware Store</Text>
        <View style={styles.coinBadge}>
          <MaterialCommunityIcons name="hand-coin" size={14} color="#F9C449" />
          <Text style={styles.coinBadgeText}>1,250</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FFF8E1', '#FFECB3']} style={styles.banner}>
          <Text style={styles.bannerTitle}>Unlock Smart Gear</Text>
          <Text style={styles.bannerSub}>Use your gathered Solar Coins to get flat discounts on actual energy-efficient hardware!</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>FEATURED HARDWARE</Text>
        
        {/* Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Top Row - 2 Items */}
          <View style={styles.row}>
            <BentoItem item={PRODUCTS[0]} style={{ flex: 1, marginRight: 8 }} />
            <BentoItem item={PRODUCTS[1]} style={{ flex: 1, marginLeft: 8 }} />
          </View>
          {/* Bottom Row - 2 Items */}
          <View style={styles.row}>
            <BentoItem item={PRODUCTS[2]} style={{ flex: 1, marginRight: 8 }} />
            <BentoItem item={PRODUCTS[3]} style={{ flex: 1, marginLeft: 8 }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function BentoItem({ item, style }) {
  return (
    <View style={[styles.bentoItem, style]}>
      <View style={styles.imgWrap}>
        <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
      </View>
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.itemDesc} numberOfLines={2}>{item.desc}</Text>
      
      <View style={{ flex: 1 }} />
      
      <View style={styles.pricingArea}>
        <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        <View style={styles.tagWrap}>
             <MaterialCommunityIcons name="hand-coin" size={12} color="#E65100" />
             <Text style={styles.coinPriceText}>{item.coinPriceLabel}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>BUY NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { padding: 16, paddingBottom: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#FAFAFA' },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDF2FC', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A2A3A' },
  coinBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E3A5F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  coinBadgeText: { color: '#FFF', fontWeight: '800', marginLeft: 4, fontSize: 13 },
  banner: { padding: 20, borderRadius: 16, marginBottom: 24 },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: '#E65100', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#F57C00', lineHeight: 18 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#6B7A8D', letterSpacing: 1, marginBottom: 16, marginTop: 4 },
  bentoGrid: { flexDirection: 'column' },
  row: { flexDirection: 'row', marginBottom: 16 },
  bentoItem: { 
    backgroundColor: '#FFF', borderRadius: 16, padding: 12, 
    borderWidth: 1, borderColor: '#E8ECF0', 
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
    minHeight: 240
  },
  imgWrap: { width: '100%', height: 100, backgroundColor: '#F9FAFB', borderRadius: 12, marginBottom: 12, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  itemImg: { width: '85%', height: '85%' },
  itemName: { fontSize: 14, fontWeight: '800', color: '#1A2A3A', marginBottom: 4 },
  itemDesc: { fontSize: 11, color: '#8A9BAE', marginBottom: 12, lineHeight: 15 },
  pricingArea: { marginBottom: 12 },
  originalPrice: { fontSize: 16, fontWeight: '800', color: '#1E3A5F', textDecorationLine: 'line-through', textDecorationColor: '#8A9BAE', opacity: 0.6, marginBottom: 4 },
  tagWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  coinPriceText: { fontSize: 9, fontWeight: '800', color: '#E65100', marginLeft: 4 },
  buyBtn: { backgroundColor: '#1A2A3A', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  buyBtnText: { color: '#FFF', fontSize: 11, fontWeight: '800' }
});
