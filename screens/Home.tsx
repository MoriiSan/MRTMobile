import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';

interface Card {
    uid: number;
    bal: number;
}

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [cards, setCards] = useState<Card[]>([]);
    /*     const [uid, setUid] = useState('');
        const [bal, setBal] = useState('');
        const [label, setLabel] = useState(''); */
    const [deviceId, setDeviceId] = useState('');

    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    const fetchDeviceId = async () => {
        try {
            const id = await DeviceInfo.getUniqueId();
            setDeviceId(id);
            // console.log(id)
        } catch (error) {
            console.error('Error fetching device ID:', error);
        }
    };

    const fetchSavedCard = async () => {
        const date = new Date();
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/linkedCards/${deviceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedCard = await response.json();
            if (response.ok) {
                setCards(fetchedCard)
                /* setUid(fetchedCard.uid)
                setBal(fetchedCard.bal); */
                setLastUpdated(formattedDate);
            } else {
                console.log("Failed to fetch card");
            }
        } catch (error) {
            console.error('Error fetching saved card data:', error);
        } finally {
            setTimeout(() => {
                setLoader(false);
            }, 300);
            setRefreshing(false);
        }
    };

    const navigateToLogs = async (uid: string) => {
        try {
            await AsyncStorage.setItem('selectedCardUid', uid.toString());
            console.log('UID saved successfully:', uid);
            navigation.navigate('Transaction Logs' as never);
        } catch (error) {
            console.error('Error saving UID to AsyncStorage:', error);
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        setCurrentDate(formattedDate);
    }

    const getMonthName = (monthIndex: number) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex];
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoader(true);
        fetchSavedCard();
        getCurrentDate();
    }, [isFocused]);

    useEffect(() => {
        fetchDeviceId();
        fetchSavedCard();
        getCurrentDate();
        onRefresh();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.date}
                >{currentDate}</Text>
                <Text
                    style={styles.hello}
                >Hello
                    <Text
                        style={styles.name}
                    >, Jhenna!</Text>
                </Text>
                <TouchableOpacity
                    style={styles.profileBtn}
                    onPress={() => navigation.navigate('Account' as never)}>
                    <Icon
                        name="person"
                        size={14}
                        style={styles.icon}
                    />
                    <Text style={styles.profileBtnLabel}
                    >Profile</Text>
                </TouchableOpacity>

            </View>
            {/* card ///////////////// */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                style={{ flexGrow: 1 }} />}>
                {cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardTop}>
                                <View>
                                    <Text style={styles.label}>Label</Text>
                                    <Text style={styles.uid}>{card.uid}</Text>
                                </View>
                                <Icon name="trash-outline" size={22} style={{ color: '#a1aab8', marginTop: 8 }} />
                            </View>
                            <View style={styles.balContainer}>
                                <Text style={styles.bal}>PHP {card.bal}</Text>
                                <Text style={styles.updateInfo}>Last updated: {lastUpdated}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.logsBtn}
                            onPress={() => navigateToLogs(card.uid.toString())}>
                            <View style={styles.logsBtnLabel}>
                                <Icon name="document-text-outline" size={14} style={{ color: '#262020' }} />
                                <Text style={styles.logsBtnText}>Transaction Logs</Text>
                            </View>
                            <Icon name="arrow-forward-outline" size={20} style={{ color: '#262020' }} />
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Pull down to refresh</Text>
                </View>
            </ScrollView>
            {loader && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fece2e" />
                </View>
            )}
            <TouchableOpacity
                style={styles.addCardBtn}
                onPress={() => navigation.navigate('Add Card' as never)}>
                <Icon
                    name="add-outline"
                    size={40}
                    style={{
                        color: '#262020',
                    }}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#fece2e',
        padding: 10,
        borderBottomRightRadius: 25,
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: '#262020',

    },
    icon: {
        color: '#222',
    },
    date: {
        color: '#262020',
        fontSize: 13,
        marginTop: 10,
    },
    hello: {
        fontWeight: '400',
        fontSize: 28,
        color: '#262020',
    },
    name: {
        fontWeight: '800',
    },
    profileBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 100,
        marginRight: 5,
        marginBottom: 8,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#262020',
        gap: 5,
    },
    profileBtnLabel: {
        color: '#262020',
        fontSize: 14,
    },
    ////////////////////////////
    card: {
        backgroundColor: '#fcf4e7',
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
        justifyContent: 'space-between'
    },
    balContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    bal: {
        position: 'absolute',
        bottom: 0,
        right: 3,
        fontSize: 48,
        fontWeight: '900',
        color: '#8d9f5f',
    },
    label: {
        paddingTop: 5,
        fontSize: 14,
        color: '#262020',
    },
    updateInfo: {
        position: 'absolute',
        bottom: -5,
        right: 3,
        fontSize: 12,
        color: '#a1aab8',

    },
    logsBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#fece2e',
        // alignSelf: 'flex-end',
    },
    logsBtnLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    logsBtnText: {
        fontWeight: '500',
        color: '#262020',
    },
    addCardBtn: {
        padding: 5,
        backgroundColor: '#fece2e',
        borderRadius: 10,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingBottom: 100,
    },
    emptyText: {
        color: '#a1aab8',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },

});
