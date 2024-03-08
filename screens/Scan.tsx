import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { TextInput } from 'react-native-gesture-handler';

export const storage = new MMKV()

export default function Scan() {
    const navigation = useNavigation();
    const { hasPermission, requestPermission } = useCameraPermission()
    const [cameraVisible, setCameraVisible] = useState(false);
    const [station, setStation] = useState('');
    const [stationIn, setStationIn] = useState('');
    const [stationOut, setStationOut] = useState('');
    const [fare, setFare] = useState<number>(0);
    const [totalFare, setTotalFare] = useState<number>(0);
    const [bal, setBal] = useState<number>(0);
    const [finalBal, setFinalBal] = useState<number>(0);

    const device = useCameraDevice('back')

    const fave = storage.getString('faveCard');
    // console.log('Scan:', fave);

    const toggleCamera = async () => {
        if (!hasPermission) {
            if (await requestPermission()) {
                setCameraVisible(!cameraVisible);
            }
        } else if (hasPermission) {
            setCameraVisible(!cameraVisible);
        }
    };

    // const isValidBeepCard = (value: string) => {
    //     const regex = /^[0-9\b]+$/;
    //     return regex.test(value);
    // };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            const { value } = codes[0];
            console.log(`Scanned ${value}!`)
            setStation(value!)
            setCameraVisible(false)
            traveledDistance(stationIn, value!)
            console.log('in, out: ', stationIn, value!)
            // fetchCard();
        }
    })

    const fetchCard = async () => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/${fave}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedCard = await response.json();
            if (response.ok) {
                setStationIn(fetchedCard.tapState)
                setBal(fetchedCard.bal);
                console.log('tapState: ', fetchedCard.tapState)
                console.log('bal: ', fetchedCard.bal)
            } else {
                console.error('Failed to fetch cards');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const getFare = async () => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/adminConfigs/fare`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const fetchedFare = await response.json();
                setFare(fetchedFare)
                console.log('fare: ', fetchedFare)
            } else {
                console.error('Failed to fetch fare');
            }
        } catch (error) {
            console.error('Error fetching fare:', error);
        }
    }

    const handleTapIn = async () => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/tapIn/${fave}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tapState: station })
            });

            // const card = await response.json();
            if (response.ok) {
                console.log('Tap in successful');
                setStation('')

            } else {
                console.log('Tap in failed')
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }

    const preTapOut = async () => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/tapOut/${fave}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tapState: '' })
            });
            const card = await response.json();
            if (response.ok) {
                // setStationIn(card.tapState)
                setStationOut(station);
                setFinalBal(card.bal - totalFare)
                console.log('finalBal:', card.bal - totalFare)
                console.log('OK pre-tapout')
            } else {

            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const traveledDistance = async (initialStation: string, finalStation: string) => {
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/stations/traveled-distance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initialStation, finalStation })
            });
            const distanceTraveled = await response.json();
            if (response.ok) {
                // setTotalFare(Math.round(Number((distanceTraveled.totalFare).toFixed(1))));
                // console.log('totalFare:', Math.round(Number((distanceTraveled.totalFare).toFixed(1))));

                setTotalFare(Math.round(Number((fare * distanceTraveled.distance).toFixed(1))));
                console.log('Total Fare: ', ((fare * distanceTraveled.distance).toFixed(1)))
                return Math.round(Number((fare * distanceTraveled.distance).toFixed(1)))
            } else {
                console.error('Error setting edge distances');
            }
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    const handleTapOut = async () => {
        const currentTime = new Date().toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        await preTapOut();
        const totalBal = bal - totalFare;
        console.log(totalBal)

        try {
            // Update the database with the final balance immediately
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/user-update-card/${fave}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bal: totalBal, dateTravel: currentTime, charge: String(totalFare) })
            });

            if (response.ok) {
                console.log('Tap out successful!')
                setStation('')

            } else {
                console.error('Failed to update card balance');
            }
        } catch (error) {
            console.error('Error updating card balance:', error);
        }
    }


    useEffect(() => {
        fetchCard();
        getFare();
    }, [cameraVisible]);

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
                    Scan QR
                </Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                    onPress={() => toggleCamera()}>
                    <Text style={{ color: 'black', marginRight: 10 }}>Scan</Text>
                </TouchableOpacity>
            </View>
            {!cameraVisible &&
                <>
                    <TouchableOpacity
                        onPress={() => toggleCamera()}>
                        <View style={styles.scanContainer}>
                            <Text style={styles.scanBtn}>CLICK TO SCAN</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='e.g station name'
                            placeholderTextColor='#a1aab8'
                            editable={false}
                            value={station}
                        />
                    </View>
                </>
            }
            {cameraVisible &&
                <View style={styles.cameraContainer}>
                    <Camera
                        style={styles.camera}
                        device={device!}
                        isActive={true}
                        codeScanner={codeScanner} />
                </View>
            }
            <View style={styles.signOutContainer}>
                <TouchableOpacity
                    style={styles.signOutBtn}
                    onPress={() => handleTapIn()} >
                    <Text style={styles.signOutBtnText}>Tap In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signOutBtn}
                    onPress={() => handleTapOut()} >
                    <Text style={styles.signOutBtnText}>Tap Out</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        margin: 10,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
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
        width: '90%',
        flexDirection: 'row',
        gap: 10,
        margin: 10,
        marginHorizontal: 20,
    },
    signOutBtn: {
        color: '#262020',
        padding: 10,
        backgroundColor: '#fece2e',
        borderColor: '#262020',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
    },
    signOutBtnText: {
        color: '#262020',
        fontWeight: '500',
    },
    input: {
        position: 'relative',
        height: 50,
        padding: 15,
        marginHorizontal: 15,
        color: '#262020',
        backgroundColor: 'white',
        borderColor: '#262020',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 10,
    },
    scanContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        margin: 15,
        padding: 10,
        width: '92%',
        height: '70%',
    },
    scanBtn: {
        color: 'black',
        fontWeight: '900',
        fontSize: 24,
    },
});