import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv'
import Icon from 'react-native-vector-icons/Ionicons';

interface Log {
    charge: string;
    dateTravel: string;
    topUp: string;
    dateLoaded: string;
};

export const storage = new MMKV()

export default function Logs() {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [logs, setLogs] = useState<Log[]>([]);
    const [uid, setUid] = useState();
    const [bal, setBal] = useState();
    const [lastUpdated, setLastUpdated] = useState('');

    const selectedUid = storage.getString('selectedUid')

    const fetchLogs = async () => {
        const date = new Date();
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/${selectedUid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedCard = await response.json();
            if (response.ok) {
                setUid(fetchedCard.uid);
                setBal(fetchedCard.bal)
                setLogs(fetchedCard.logs);
                setLastUpdated(formattedDate);
                setLoader(false);
            } else {
                console.error('Failed to fetch logs');
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const getMonthName = (monthIndex: number) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex];
    }

    useEffect(() => {
        fetchLogs();
        setLoader(true);
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

            {loader && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fece2e" />
                </View>
            )}

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardTop}>
                        <View>
                            {/* <Text style={styles.label}>Label</Text> */}
                            <Text style={styles.uid}>{uid}</Text>
                        </View>
                    </View>
                    <View style={styles.balContainer}>
                        <Text style={styles.bal}>PHP {bal}</Text>
                        <Text style={styles.updateInfo}>Last updated: {lastUpdated}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.logsContainer}>
                {logs.slice().reverse().map((log, index) => (
                    <View key={index} style={styles.serviceContainer}>
                        {(log.dateTravel && log.charge) ? (
                            <>
                                <View style={styles.leftSide}>
                                    <Icon
                                        name="navigate"
                                        size={15}
                                        style={styles.navigateIcon}
                                    />
                                    <View style={styles.service}>
                                        <View style={styles.typeDate}>
                                            <View>
                                                <Text style={styles.serviceType}>MRT Rail Service Provider</Text>
                                                <Text style={styles.serviceDate}>{log.dateTravel}</Text>
                                            </View>
                                            <Text style={styles.amount}>- PHP {log.charge}</Text>
                                        </View>
                                    </View>
                                </View>

                            </>
                        ) : (
                            <>
                                <View style={styles.leftSide}>
                                    <Icon
                                        name="card"
                                        size={15}
                                        style={styles.cardIcon}
                                    />
                                    <View style={styles.service}>
                                        <View style={styles.typeDate}>
                                            <View>
                                                <Text style={styles.serviceType}>E-Commerce Payment</Text>
                                                <Text style={styles.serviceDate}>{log.dateLoaded}</Text>
                                            </View>
                                            <Text style={styles.amountTopUp}>+ PHP {log.topUp}</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}
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
    logsContainer: {
        marginBottom: 15,
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
    service: {
        flex: 1,
    },
    typeDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceType: {
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

    //card
    card: {
        backgroundColor: '#fece2e',
        padding: 15,
        paddingTop: 5,
        borderRadius: 10,
        margin: 15,
        marginBottom: 0,
        height: 200,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#262020',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uid: {
        position: 'relative',
        bottom: 10,
        fontSize: 32,
        fontWeight: '900',
        color: '#262020',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    balContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    bal: {
        position: 'absolute',
        bottom: -5,
        right: 3,
        fontSize: 48,
        fontWeight: '900',
        color: 'white',
    },
    label: {
        paddingTop: 5,
        fontSize: 14,
        color: '#262020',
    },
    updateInfo: {
        position: 'absolute',
        bottom: -10,
        right: 3,
        fontSize: 12,
        color: '#B57E4D',

    },
});
