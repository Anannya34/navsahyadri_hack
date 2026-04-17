import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ElectricityBillScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState('UPI');

    const paymentMethods = [
        { id: 'UPI', label: 'UPI', icon: 'account-balance', type: 'MaterialIcons' },
        { id: 'Card', label: 'Card', icon: 'credit-card', type: 'Ionicons' },
        { id: 'Net Banking', label: 'Net Banking', icon: 'account-balance', type: 'MaterialIcons' },
        { id: 'Wallet', label: 'Wallet', icon: 'wallet', type: 'Ionicons' }
    ];

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
                    <Text style={styles.headerTitle}>Pay Electricity Bill</Text>
                    <View style={styles.headerLogoContainer}>
                       <Ionicons name="partly-sunny" size={18} color="#FFB703" />
                       <Text style={styles.headerLogoText}>SOLIQ</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Main Billing Card */}
                    <View style={styles.mainCard}>
                        <View style={styles.billingPeriodRow}>
                            <Text style={styles.billingPeriodLabel}>Billing Period</Text>
                            <Text style={styles.billingPeriodValue}>March 2026</Text>
                        </View>

                        <View style={styles.horizontalLine} />

                        <View style={styles.billRow}>
                            <View style={[styles.iconCircle, {backgroundColor: '#dbeafe'}]}>
                                <Ionicons name="flash" size={16} color="#3b82f6" />
                            </View>
                            <Text style={styles.billRowLabel}>Total Electricity Bill</Text>
                            <Text style={styles.billRowValue}>₹ 4,200.00</Text>
                        </View>

                        <View style={styles.billRow}>
                            <View style={[styles.iconCircle, {backgroundColor: '#fef08a'}]}>
                                <Ionicons name="sunny" size={16} color="#eab308" />
                            </View>
                            <Text style={styles.billRowLabel}>Solar Energy Generated</Text>
                            <Text style={[styles.billRowValue, {color: '#16a34a'}]}>− ₹ 1,850.00</Text>
                        </View>

                        {/* Net Amount Section */}
                        <View style={styles.netAmountContainer}>
                            <View style={styles.dashedLineContainer}>
                                <View style={styles.dashedLine} />
                            </View>
                            <LinearGradient
                                colors={['#fef9c3', '#fde047']}
                                style={styles.netAmountInner}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View style={[styles.iconCircle, {backgroundColor: '#93c5fd'}]}>
                                    <MaterialIcons name="account-balance" size={16} color="#fff" />
                                </View>
                                <Text style={styles.netAmountLabel}>Net Amount Payable</Text>
                                <Text style={styles.netAmountValue}>₹ 2,350.00</Text>
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Savings Banner */}
                    <View style={styles.savingsBanner}>
                        <LinearGradient
                            colors={['#ecfdf5', '#d1fae5']}
                            style={styles.savingsBannerGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                           <Ionicons name="sunny" size={20} color="#eab308" />
                           <Text style={styles.savingsText}>
                               <Text style={{fontWeight: 'bold'}}>You saved ₹ 1,850</Text> this month using Solar Energy!
                           </Text>
                        </LinearGradient>
                    </View>

                    {/* Bill Breakdown */}
                    <Text style={styles.sectionTitle}>Bill Breakdown</Text>
                    <View style={styles.breakdownCard}>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Fixed Charges</Text>
                            <Text style={styles.breakdownValue}>₹ 200</Text>
                        </View>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Units Consumed</Text>
                            <View style={styles.breakdownCalculation}>
                                <Text style={styles.breakdownCalcText}>380 kWh × ₹ 10 = </Text>
                                <Text style={styles.breakdownValue}>₹ 3,800</Text>
                            </View>
                        </View>
                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Taxes & Surcharge</Text>
                            <Text style={styles.breakdownValue}>₹ 200</Text>
                        </View>
                        <View style={[styles.breakdownRow, { marginBottom: 0 }]}>
                            <Text style={styles.breakdownLabel}>Solar Units Fed Back</Text>
                            <View style={styles.breakdownCalculation}>
                                <Text style={styles.breakdownCalcText}>-175 kWh × ₹ 10.57 = </Text>
                                <Text style={[styles.breakdownValue, {color: '#16a34a'}]}>₹ 1,850</Text>
                            </View>
                        </View>
                    </View>

                    {/* Choose Payment Method */}
                    <Text style={styles.sectionTitle}>Choose Payment Method</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.paymentMethodsScroll}>
                        {paymentMethods.map((method) => {
                            const isSelected = selectedPayment === method.id;
                            return (
                                <TouchableOpacity 
                                    key={method.id} 
                                    style={[styles.paymentMethodCard, isSelected && styles.paymentMethodCardSelected]}
                                    onPress={() => setSelectedPayment(method.id)}
                                >
                                    {method.type === 'Ionicons' && <Ionicons name={method.icon} size={18} color={isSelected ? "#d97706" : "#64748b"} />}
                                    {method.type === 'MaterialIcons' && <MaterialIcons name={method.icon} size={18} color={isSelected ? "#d97706" : "#64748b"} />}
                                    <Text style={[styles.paymentMethodText, isSelected && styles.paymentMethodTextSelected]}>{method.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    {/* Pay Now Button */}
                    <TouchableOpacity style={styles.payButtonContainer}>
                        <LinearGradient
                            colors={['#FFC300', '#FF9F00']}
                            style={styles.payButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.payButtonText}>Pay ₹ 2,350 Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Footer Text */}
                    <Text style={styles.footerText}>Powered by SoliQ Solar Intelligence</Text>

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
        paddingBottom: 15,
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
    scrollContent: {
        paddingBottom: 120,
        paddingHorizontal: 20,
    },
    
    // Main Card
    mainCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10,
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 3,
    },
    billingPeriodRow: {
        flexDirection: 'row',
        padding: 18,
        alignItems: 'center',
    },
    billingPeriodLabel: {
        fontSize: 14,
        color: '#1c3b5e',
        marginRight: 10,
    },
    billingPeriodValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#fde047',
        marginHorizontal: 18,
        marginBottom: 15,
    },
    
    billRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 15,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    billRowLabel: {
        flex: 1,
        fontSize: 14,
        color: '#475569',
    },
    billRowValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    
    netAmountContainer: {
        marginTop: 5,
        position: 'relative',
    },
    dashedLineContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 2,
        overflow: 'hidden',
        zIndex: 2,
    },
    dashedLine: {
        width: '100%',
        height: 2,
        borderWidth: 1,
        borderColor: '#fbbf24',
        borderStyle: 'dashed',
    },
    netAmountInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        paddingTop: 20,
    },
    netAmountLabel: {
        flex: 1,
        fontSize: 14,
        color: '#92400e',
        fontWeight: '500',
    },
    netAmountValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#92400e',
    },
    
    // Savings Banner
    savingsBanner: {
        marginTop: 15,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    savingsBannerGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 16,
    },
    savingsText: {
        fontSize: 13,
        color: '#065f46',
        marginLeft: 10,
        flex: 1,
    },
    
    // Section Titles
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1c3b5e',
        marginTop: 25,
        marginBottom: 12,
    },
    
    // Breakdown Card
    breakdownCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#a9cce3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    breakdownLabel: {
        fontSize: 13,
        color: '#475569',
    },
    breakdownValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1c3b5e',
    },
    breakdownCalculation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breakdownCalcText: {
        fontSize: 13,
        color: '#64748b',
    },
    
    // Payment Methods
    paymentMethodsScroll: {
        paddingBottom: 5,
        paddingRight: 20,
    },
    paymentMethodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    paymentMethodCardSelected: {
        backgroundColor: '#fef3c7',
        borderColor: '#fbbf24',
    },
    paymentMethodText: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 8,
        fontWeight: '500',
    },
    paymentMethodTextSelected: {
        color: '#d97706',
        fontWeight: 'bold',
    },
    
    // Pay Button
    payButtonContainer: {
        marginTop: 30,
    },
    payButton: {
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#FB8500',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    
    // Footer
    footerText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#64748b',
        marginTop: 15,
    }
});

export default ElectricityBillScreen;
