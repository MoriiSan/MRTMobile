import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

interface Log {
    charge: string;
    dateTravel: string;
}

export default function Logs() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<Log[]>([]);

    const fetchLogs = async () => {
        try {
            const uid = await AsyncStorage.getItem('selectedCardUid');
            const response = await fetch(`http://localhost:8080/cards/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedCard = await response.json();
            if (response.ok) {
                setLogs(fetchedCard.logs);
                console.log(fetchedCard.logs)
                setLoading(false);
            } else {
                console.error('Failed to fetch logs');
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fece2e" />
            </View>
        );
    }

    useEffect(() => {
        fetchLogs();
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
                    Transaction Logs
                </Text>
                <View style={{ flex: 1 }}></View>
            </View>
            <ScrollView>
                {logs.map((log, index) => (
                    <View key={index} style={styles.serviceContainer}>
                        <View style={styles.leftSide}>
                            <Icon
                                name="navigate"
                                size={15}
                                style={styles.navigateIcon}
                            />
                            <View style={styles.serviceType}>
                                <Text style={styles.serviceType}>MRT Rail Service Provider</Text>
                                <Text style={styles.serviceDate}>{log.dateTravel}</Text>
                            </View>
                        </View>
                        <Text style={styles.amount}>{log.charge}</Text>
                    </View>
                ))}
            </ScrollView>
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
    serviceContainer: {
        borderRadius: 10,
        borderWidth: 1.5,
        margin: 15,
        marginBottom: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    navigateIcon: {
        borderWidth: 1.5,
        padding: 5,
        paddingBottom: 2,
        paddingRight: 3,
        borderRadius: 5,
        color: '#262020',
        backgroundColor: '#df9292'
    },
    cardIcon: {
        borderWidth: 1.5,
        padding: 5,
        paddingBottom: 2,
        paddingRight: 3,
        borderRadius: 5,
        color: '#262020',
        backgroundColor: '#bef18b'
    },
    serviceType: {
        flexDirection: 'column',
        color: '#262020',
        fontWeight: '500',
        fontSize: 16,
    },
    serviceDate: {
        fontSize: 13,
        color: '#a1aab8',
    },
    amount: {
        fontWeight: '700',
        fontSize: 18,
        color: '#e94545'
    },
    amountTopUp: {
        fontWeight: '700',
        fontSize: 18,
        color: '#96e945'
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
});
