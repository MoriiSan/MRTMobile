import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv'
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';

export const storage = new MMKV()

export default function Account() {
    const navigation = useNavigation();
    const [deviceId, setDeviceId] = useState('');

    const fetchDeviceId = async () => {
        try {
            const id = await DeviceInfo.getUniqueId();
            setDeviceId(id);
            // console.log(id);
        } catch (error) {
            console.error('Error fetching device ID:', error);
        }
    };

    const userPin = storage.getString('user_pin');
    // console.log('account:', userPin);
    const nickname = storage.getString('nickname');

    const removeAllCards = async () => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/remove-all-cards/${deviceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('')
                Alert.alert('SUCCESS','Successfully closed account');
            } else {
                console.log("Failed to remove all cards");
                Alert.alert('OOPS', 'Failed to remove account');
            }
        } catch (error) {
            console.error('Error removing linked cards:', error);
        }
    };

    const handleCloseAccount = () => {
        removeAllCards();
        storage.clearAll();
        navigation.navigate('Welcome' as never);
    }

    useEffect(() => {
        fetchDeviceId();
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.goBack}
                    onPress={() => navigation.navigate('Home' as never)}>
                    <Icon
                        name="arrow-back-outline"
                        size={20}
                        style={styles.goBackIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Account
                </Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.signOutContainer}>
                <TouchableOpacity
                    style={styles.signOutBtn}
                    onPress={() => navigation.navigate('Welcome' as never)}>
                    <Text style={styles.signOutBtnText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Hi, {nickname}!</Text>
            </View>
            <View style={styles.settingsContainer}>
                {/* <Text style={styles.settingItem}>Change PIN</Text> */}
                <TouchableOpacity
                    onPress={handleCloseAccount}>
                    <Text style={styles.settingItem}>Close Account</Text>
                </TouchableOpacity>
                {/* <Text style={styles.settingItem}>FAQs</Text> */}
                {/* <Text style={styles.settingItem}>About</Text> */}
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fcf4e7',
    },
    goBack: {
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        padding: 5,
        color: '#262020',
        backgroundColor: '#fece2e',
    },
    goBackIcon: {
        color: '#262020',
    },
    header: {
        // backgroundColor: '#fece2e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    headerText: {
        position: 'absolute',
        color: '#262020',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    signOutContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '100%',
    },
    signOutBtn: {
        color: '#262020',
        padding: 10,
        margin: 15,
        backgroundColor: '#fece2e',
        borderColor: '#262020',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    signOutBtnText: {
        color: '#262020',
        fontWeight: '500',
    },
    nameContainer: {
        alignItems: 'flex-start',
        margin: 15,
        marginHorizontal: 25,
        marginBottom: 0,
    },
    name: {
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: 28,
        color: '#262020',
    },
    settingsContainer: {
        margin: 15,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: 'white',
        gap: 20,

    },
    settingItem: {
        color: 'black',
    }
});