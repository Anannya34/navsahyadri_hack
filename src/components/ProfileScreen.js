import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

const SunAvatarRing = () => {
    // Generates 36 little sun rays around the circle
    const rays = Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        // The center is at (70,70). Inner radius of rays = 61, outer = 67
        const x1 = 70 + 61 * Math.cos(angle);
        const y1 = 70 + 61 * Math.sin(angle);
        const x2 = 70 + 67 * Math.cos(angle);
        const y2 = 70 + 67 * Math.sin(angle);
        return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFB703" strokeWidth="2" strokeLinecap="round" />;
    });

    return (
        <View style={styles.svgContainer}>
            <Svg width="140" height="140" viewBox="0 0 140 140">
                <Circle cx="70" cy="70" r="56" stroke="#FFB703" strokeWidth="2" fill="none" />
                {rays}
            </Svg>
        </View>
    );
};

const ProfileField = ({ icon, iconType, iconBgColor, label, value }) => {
    return (
        <View style={styles.fieldContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
                {iconType === 'Ionicons' && <Ionicons name={icon} size={20} color="#fff" />}
                {iconType === 'FA5' && <FontAwesome5 name={icon} size={16} color="#fff" />}
                {iconType === 'MaterialIcons' && <MaterialIcons name={icon} size={20} color="#fff" />}
            </View>
            <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>{label}</Text>
                <Text style={styles.fieldValue}>{value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#b0b0b0" style={styles.chevron} />
        </View>
    );
};

const ProfileScreen = () => {
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
                    <Text style={styles.headerTitle}>User Profile</Text>
                    <View style={styles.placeholderButton} /> 
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Avatar Section */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <SunAvatarRing />
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} // Placeholder face
                                style={styles.avatar}
                            />
                        </View>
                        <Text style={styles.userName}>Rahul Sharma</Text>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#FFB703', '#FB8500']}
                                style={styles.editProfileButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <MaterialIcons name="edit" size={14} color="#fff" style={styles.editIcon}/>
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.fieldsSection}>
                        <ProfileField
                            icon="person"
                            iconType="Ionicons"
                            iconBgColor="#FFB703"
                            label="Full Name"
                            value="Rahul Sharma"
                        />
                        <ProfileField
                            icon="mail"
                            iconType="Ionicons"
                            iconBgColor="#90C2E7"
                            label="Email"
                            value="rahul.sharma@gmail.com"
                        />
                        <ProfileField
                            icon="call"
                            iconType="Ionicons"
                            iconBgColor="#90C2E7"
                            label="Phone Number"
                            value="+91 98765 43210"
                        />
                        <ProfileField
                            icon="location-on"
                            iconType="MaterialIcons"
                            iconBgColor="#FFB703"
                            label="Address"
                            value="123 Green Lane, Bengaluru, India"
                        />
                    </View>

                    {/* Divider with Sun */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <View style={styles.sunIconContainer}>
                            {/* Top half of a sun effect */}
                            <Ionicons name="partly-sunny-outline" size={20} color="#FFB703" style={{ transform: [{ translateY: 4 }] }} />
                        </View>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Save Changes Button */}
                    <TouchableOpacity style={styles.saveButtonContainer}>
                        <LinearGradient
                            colors={['#FFC300', '#FF9F00']}
                            style={styles.saveButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};
export default ProfileScreen;