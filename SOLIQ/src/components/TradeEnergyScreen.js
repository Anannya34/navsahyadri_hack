import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TradeEnergyScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#e6f2fa', '#f0f9ff', '#ebf4fa']}
                style={styles.container}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1c3b5e" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Trade Energy</Text>
                    <View style={styles.headerLogoContainer}>
                       <Ionicons name="partly-sunny" size={18} color="#FFB703" />
                       <Text style={styles.headerLogoText}>SOLIQ</Text>
                    </View>
                </View>

                {/* Live Status */}
                <View style={styles.liveStatusContainer}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveStatusText}>Grid Connected - Live</Text>
                    <Text style={styles.liveStatusDotEnd}> •</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Overview Card */}
                    <View style={styles.overviewCard}>
                        <Text style={styles.overviewTitle}>Today's Energy Overview</Text>
                        
                        <View style={styles.circlesContainer}>
                            {/* Solar Panel */}
                            <View style={styles.circleWrapper}>
                                <View style={[styles.circle, {borderColor: '#fde047'}]}>
                                    <Ionicons name="sunny" size={22} color="#facc15" />
                                    <Text style={styles.circleLabel}>Solar Panel</Text>
                                    <Text style={styles.circleValue}>28.4 <Text style={styles.circleUnit}>kwh</Text></Text>
                                </View>
                            </View>

                            {/* Your Home */}
                            <View style={styles.circleWrapper}>
                                <View style={[styles.circle, {borderColor: '#93c5fd'}]}>
                                    <Ionicons name="home" size={22} color="#60a5fa" />
                                    <Text style={styles.circleLabel}>Your Home</Text>
                                    <Text style={styles.circleValue}>11.2 <Text style={styles.circleUnit}>kwh</Text></Text>
                                </View>
                            </View>

                            {/* Power Grid */}
                            <View style={styles.circleWrapper}>
                                <LinearGradient
                                    colors={['#4ade80', '#22c55e']}
                                    style={styles.circleGlow}
                                >
                                    <View style={[styles.circle, {borderWidth: 0, backgroundColor: '#fff', width: 76, height: 76, borderRadius: 38}]}>
                                        <MaterialCommunityIcons name="transmission-tower" size={22} color="#22c55e" />
                                        <Text style={styles.circleLabel}>Power Grid</Text>
                                        <Text style={styles.circleValue}>17.2 <Text style={styles.circleUnit}>kwh</Text></Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>

                        <LinearGradient
                            colors={['#ecfdf5', '#d1fae5']}
                            style={styles.surplusBanner}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                           <Ionicons name="sunny" size={18} color="#eab308" />
                           <Text style={styles.surplusText}>
                               You have <Text style={{fontWeight: 'bold', color: '#065f46'}}>17.2 kWh</Text> surplus energy ready to trade!
                           </Text>
                        </LinearGradient>
                    </View>

                    {/* Flow Diagram */}
                    <View style={styles.flowContainer}>
                        <View style={styles.flowIconsRow}>
                            <View style={styles.flowBoxWrapper}>
                                <LinearGradient colors={['#fef3c7', '#fde047']} style={styles.flowBox}>
                                    <Ionicons name="phone-portrait-outline" size={20} color="#ca8a04" style={{position: 'absolute', opacity: 0.5, left: 10}}/>
                                    <Ionicons name="sunny" size={28} color="#ca8a04" />
                                </LinearGradient>
                                <Text style={styles.flowLabel}>Solar Panel</Text>
                            </View>

                            <View style={styles.flowArrowContainer}>
                                <Text style={styles.flowDashedLine}>- - - - &gt;</Text>
                            </View>

                            <View style={styles.flowBoxWrapper}>
                                <LinearGradient colors={['#eff6ff', '#bfdbfe']} style={styles.flowBox}>
                                    <Ionicons name="home" size={28} color="#2563eb" />
                                </LinearGradient>
                                <Text style={styles.flowLabel}>Your Home</Text>
                            </View>

                            <View style={styles.flowArrowContainer}>
                                <Text style={styles.flowDashedLine}>- - - - &gt;</Text>
                            </View>

                            <View style={styles.flowBoxWrapper}>
                                <LinearGradient colors={['#ecfdf5', '#bbf7d0']} style={styles.flowBox}>
                                    <MaterialCommunityIcons name="office-building" size={28} color="#16a34a" />
                                </LinearGradient>
                                <Text style={styles.flowLabel}>Power Grid</Text>
                            </View>
                        </View>
                        <Text style={styles.flowFooterText}>Electricity Office receiving your energy.</Text>
                    </View>

                    {/* Estimated Credits */}
                    <View style={styles.creditsCard}>
                        <View style={styles.creditsHeader}>
                            <View style={styles.creditsHeaderLeft}>
                                <Ionicons name="sparkles" size={16} color="#eab308" />
                                <Text style={styles.creditsTitle}>Estimated Credits You'll Earn</Text>
                            </View>
                            <LinearGradient colors={['#d946ef', '#9333ea']} style={styles.creditsPill}>
                                <Text style={styles.creditsPillText}>+181 Credits</Text>
                            </LinearGradient>
                        </View>
                        
                        <View style={styles.creditsCalculation}>
                            <Text style={styles.creditsValueText}>
                                <Text style={{fontWeight: 'bold', color: '#1c3b5e'}}>17.2 kWh</Text> × ₹ 10.57/unit = <Text style={{fontWeight: 'bold', color: '#1c3b5e'}}>181.80</Text> Credits
                            </Text>
                        </View>
                        <Text style={styles.creditsFooterText}>Rate set by your electricity board: ₹10.57 per kWh fed back</Text>
                    </View>

                    {/* Credit Wallet */}
                    <View style={styles.walletHeader}>
                        <Ionicons name="wallet" size={20} color="#ca8a04" style={{backgroundColor: '#fef3c7', padding: 4, borderRadius: 6}} />
                        <Text style={styles.walletTitle}>Your SoliQ Credit Wallet</Text>
                    </View>
                    
                    <View style={styles.walletCard}>
                        <View style={styles.walletRow}>
                            <View style={styles.walletDateWrapper}>
                                <Ionicons name="sunny" size={18} color="#eab308" />
                                <Text style={styles.walletDate}>28 Mar 2026</Text>
                            </View>
                            <Text style={styles.walletAmountBold}>₹ 1,240.00</Text>
                        </View>
                        
                        <View style={styles.walletDivider} />
                        
                        <View style={styles.walletRow}>
                            <View style={styles.walletEntryLeft}>
                                <View style={styles.miniIconBg}><Ionicons name="water-outline" size={12} color="#60a5fa" /></View>
                                <Text style={styles.walletEntryText}>14.8 kWh  |  ₹ 156.44</Text>
                            </View>
                            <Text style={styles.walletEntryAmount}>₹ 362.00</Text>
                        </View>
                        
                        <View style={styles.walletRow}>
                            <View style={styles.walletEntryLeft}>
                                <View style={styles.miniIconBg}><Ionicons name="water-outline" size={12} color="#60a5fa" /></View>
                                <Text style={styles.walletEntryText}>9.2 kWh   |  ₹ 97.24</Text>
                            </View>
                            <Text style={styles.walletEntryAmount}>₹ 850.00</Text>
                        </View>
                        
                        <View style={[styles.walletRow, {marginBottom: 0}]}>
                            <View style={styles.walletEntryLeft}>
                                <View style={styles.miniIconBg}><Ionicons name="water-outline" size={12} color="#60a5fa" /></View>
                                <Text style={styles.walletEntryText}>19.5 kWh  |  ₹ 206.12</Text>
                            </View>
                            <Text style={styles.walletEntryAmount}>₹ 206.12</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity style={styles.tradeButtonContainer}>
                        <LinearGradient
                            colors={['#f59e0b', '#10b981', '#047857']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.tradeButton}
                        >
                            <Ionicons name="flash" size={20} color="#fff" style={{marginRight: 8}} />
                            <Text style={styles.tradeButtonText}>Trade 17.2 kWh & Earn ₹ 181 Credits</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.disclaimerText}>Energy will be sent to the grid instantly upon confirmation.</Text>

                    <TouchableOpacity style={styles.scheduleButton}>
                        <Ionicons name="log-in-outline" size={18} color="#475569" style={{marginRight: 6}} />
                        <Text style={styles.scheduleButtonText}>Schedule for Later</Text>
                    </TouchableOpacity>

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e6f2fa',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 5,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    headerLogoContainer: {
        alignItems: 'center',
    },
    headerLogoText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    liveStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22c55e',
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#86efac',
    },
    liveStatusText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '500',
    },
    liveStatusDotEnd: {
        color: '#22c55e',
        fontSize: 12,
        fontWeight: '900',
    },
    scrollContent: {
        paddingBottom: 120,
        paddingHorizontal: 20,
    },
    
    // Overview Card
    overviewCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 18,
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    overviewTitle: {
        fontSize: 16,
        color: '#1c3b5e',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    circlesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    circleWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 78,
        height: 78,
        borderRadius: 39,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    circleGlow: {
        width: 82,
        height: 82,
        borderRadius: 41,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleLabel: {
        fontSize: 10,
        color: '#64748b',
        marginTop: 2,
    },
    circleValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    circleUnit: {
        fontSize: 9,
        fontWeight: 'normal',
    },
    surplusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
    },
    surplusText: {
        fontSize: 12,
        color: '#065f46',
        marginLeft: 8,
    },

    // Flow Diagram
    flowContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    flowIconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    flowBoxWrapper: {
        alignItems: 'center',
    },
    flowBox: {
        width: 60,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        position: 'relative',
    },
    flowLabel: {
        fontSize: 11,
        color: '#1c3b5e',
        fontWeight: '500',
    },
    flowArrowContainer: {
        paddingHorizontal: 5,
    },
    flowDashedLine: {
        color: '#ca8a04',
        fontSize: 16,
        letterSpacing: 2,
        fontWeight: 'bold',
    },
    flowFooterText: {
        fontSize: 12,
        color: '#64748b',
    },

    // Credits Card
    creditsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 25,
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    creditsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    creditsHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    creditsTitle: {
        fontSize: 14,
        color: '#1c3b5e',
        fontWeight: 'bold',
        marginLeft: 6,
    },
    creditsPill: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    creditsPillText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    creditsCalculation: {
        backgroundColor: '#f8fafc',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    creditsValueText: {
        fontSize: 15,
        color: '#475569',
    },
    creditsFooterText: {
        fontSize: 11,
        color: '#94a3b8',
    },

    // Wallet
    walletHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    walletTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1c3b5e',
        marginLeft: 8,
    },
    walletCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 25,
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    walletDateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletDate: {
        fontSize: 14,
        color: '#1c3b5e',
        fontWeight: '500',
        marginLeft: 8,
    },
    walletAmountBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    walletDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginBottom: 12,
    },
    walletEntryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    miniIconBg: {
        backgroundColor: '#eff6ff',
        padding: 4,
        borderRadius: 10,
        marginRight: 8,
    },
    walletEntryText: {
        fontSize: 13,
        color: '#64748b',
    },
    walletEntryAmount: {
        fontSize: 14,
        color: '#1c3b5e',
        fontWeight: '600',
    },

    // Buttons
    tradeButtonContainer: {
        marginTop: 5,
    },
    tradeButton: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    tradeButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    disclaimerText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#64748b',
        marginTop: 10,
        marginBottom: 20,
    },
    scheduleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        marginBottom: 20,
    },
    scheduleButtonText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '600',
    }
});

export default TradeEnergyScreen;
