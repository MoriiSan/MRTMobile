import { MMKV } from 'react-native-mmkv'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, Animated, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackHandler, Alert } from 'react-native';

interface Card {
    uid: number;
    bal: number;
}

export const storage = new MMKV()

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCardUid, setSelectedCardUid] = useState<number | null>(null);

    /*  const [label, setLabel] = useState(''); */
    const [deviceId, setDeviceId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    const nickname = storage.getString('nickname');

    const openDeleteModal = (uid: number) => {
        setSelectedCardUid(uid);
        setModalDelete(true);
    };

    const fetchDeviceId = async () => {
        try {
            const id = await DeviceInfo.getUniqueId();
            setDeviceId(id);
            // console.log('home:', id)
            return id;
        } catch (error) {
            console.error('Error fetching device ID:', error);
        }
    };

    const fetchSavedCard = async () => {
        const date = new Date();
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
        const id = await fetchDeviceId();
        if (!id) return;

        try {
            const response = await fetch(`http://localhost:8080/cards/linkedCards/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedCard = await response.json();
            if (response.ok) {
                setCards(fetchedCard)
                setLastUpdated(formattedDate);
                setLoader(false);
            } else {
                console.log("Failed to fetch card");
            }
        } catch (error) {
            console.error('Error fetching saved card data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const removeLinkedCard = async (uid: number) => {
        try {
            const response = await fetch(`http://localhost:8080/cards/remove-card/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchSavedCard();
                setModalVisible(true)
                setModalDelete(!modalDelete)
                storage.set('faveCard', '');
                // console.log('card successfully unlinked!')
                Alert.alert('SUCCESS','card successfully unlinked!')
            } else {
                // console.log("Failed to remove card");
                Alert.alert('OOPS','Failed to remove card');
            }
        } catch (error) {
            console.error('Error removing linked card:', error);
            Alert.alert('ERROR','Error removing linked card');
        }
    };

    const navigateToLogs = (uid: number) => {
        try {
            storage.set('selectedUid', uid.toString());
            // console.log('UID saved successfully:', storage.getString('selectedUid'));
            navigation.navigate('Transaction Logs' as never);
        } catch (error) {
            console.error('Error saving UID to AsyncStorage:', error);
        }
    };

    const faveCard = (uid: number) => {
        try {
            storage.set('faveCard', uid.toString());
            Alert.alert('INFO','Card set as favorite');
            onRefresh();
        } catch (error) {
            console.error('Error saving fave card:', error);
            Alert.alert('OOPS','Error saving fave card');
        }
    };

    const fave = storage.getString('faveCard')

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
        fetchSavedCard();
        getCurrentDate();
    }, []);

    useEffect(() => {
        fetchSavedCard();
        getCurrentDate();
        onRefresh();
        setLoader(true)
    }, [isFocused]);


    useEffect(() => {
        const backAction = () => {
            if (navigation.isFocused()) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);


    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.date}>{currentDate}</Text>
                <Text style={styles.hello}>Hello
                    <Text style={styles.name}>, {nickname}</Text>
                </Text>
                <TouchableOpacity
                    style={[styles.qrcontainer, fave ? {} : { opacity: 0.4 }]}
                    onPress={() => fave ? navigation.navigate('Scan' as never) : null}
                    disabled={!fave}
                >
                    <Icon
                        name="qr-code-outline"
                        size={35}
                        style={styles.icon} />
                </TouchableOpacity>
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

            {/* modal confirm delete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDelete}
                onRequestClose={() => {
                    setModalDelete(!modalDelete);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Remove card {selectedCardUid}?</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                if (selectedCardUid !== null) {
                                    removeLinkedCard(selectedCardUid);
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* removeLinkedCard(card.uid) */}

            {/* card ///////////////// */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                style={{ flexGrow: 1 }} />}>
                {cards.map((card, index) => (
                    <TouchableOpacity key={index}>
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardTop}>
                                    <View>
                                        {/* <Text style={styles.label}>Label</Text> */}
                                        <Text style={styles.uid}>{card.uid}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => openDeleteModal(card.uid)}
                                    >
                                        <Icon name="trash-outline" size={22} style={{ color: '#a1aab8', marginTop: 8 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.balContainer}>
                                    <Text style={styles.bal}>PHP {card.bal}</Text>
                                    <Text style={styles.updateInfo}>Last updated: {lastUpdated}</Text>
                                </View>
                            </View>
                            <View style={styles.btns}>
                                {fave === card.uid.toString() ? (
                                    <TouchableOpacity style={styles.faveBtn}>
                                        <Icon name="star" size={15} style={{ color: '#262020' }} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.faveBtn}
                                        onPress={() => faveCard(card.uid)}
                                    >
                                        <Icon name="star-outline" size={15} style={{ color: '#262020' }} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={styles.logsBtn}
                                    onPress={() => navigateToLogs(card.uid)}>
                                    <View style={styles.logsBtnLabel}>
                                        <Icon name="document-text-outline" size={14} style={{ color: '#262020' }} />
                                        <Text style={styles.logsBtnText}>Transaction Logs</Text>
                                    </View>
                                    <Icon name="arrow-forward-outline" size={20} style={{ color: '#262020' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
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
    qrcontainer: {
        position: 'absolute',
        top: 15,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,

    },
    ////////////////////////////
    card: {
        backgroundColor: 'white',
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
    btns: {
        flexDirection: 'row',
        gap: 10,
    },
    faveBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#fece2e',
    },
    logsBtn: {
        flex: 1,
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
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#a8d5e5",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        borderWidth: 1.5,
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 200,
    },
    buttonClose: {
        backgroundColor: "white",
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },
    textStyle: {
        color: "#262020",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: '#262020',
        fontWeight: '500',
        marginBottom: 15,
        textAlign: "center"
    },
});
