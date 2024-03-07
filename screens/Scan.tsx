import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export const storage = new MMKV()

export default function Scan() {
    const navigation = useNavigation();
    const { hasPermission, requestPermission } = useCameraPermission()
    const [cameraVisible, setCameraVisible] = useState(false);

    const device = useCameraDevice('back')

    const fave = storage.getString('faveCard');
    console.log('Scan:', fave);

    const toggleCamera = async () => {
        console.log('QR clicked')
        if (!hasPermission) {
            if (await requestPermission()) {
                setCameraVisible(!cameraVisible); // Ensure the camera is shown when toggling
            }
        } else if (hasPermission) {
            setCameraVisible(!cameraVisible); // Ensure the camera is shown when toggling
        }
    };

    const isValidBeepCard = (value: string) => {
        const regex = /^[0-9\b]+$/;
        return regex.test(value);
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            const { value } = codes[0];
            if (isValidBeepCard(value!.toString())) {
                console.log(`Scanned ${value}!`)
                setCameraVisible(false)
            }
        }
    })

    const handleGoBack = () => {
        setCameraVisible(false);
        navigation.navigate('Home' as never);
    }


    useEffect(() => {
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
                    Scan QR
                </Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                    onPress={() => toggleCamera()}>
                    <Text style={{ color: 'black', marginRight: 10 }}>Scan</Text>
                </TouchableOpacity>
            </View>
            {!cameraVisible &&
                <TouchableOpacity
                    onPress={() => toggleCamera()}>
                    <View style={styles.scanContainer}>
                        <Text style={styles.scanBtn}>CLICK TO SCAN</Text>
                    </View>
                </TouchableOpacity>
            }
            {cameraVisible &&
                <View style={styles.cameraContainer}>
                    <Camera
                        style={styles.camera}
                        device={device!}
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                    {/* <Text style={{ color: 'black' }}>
                </Text> */}
                </View>
            }
            <View style={styles.signOutContainer}>
                <TouchableOpacity
                    style={styles.signOutBtn} >
                    <Text style={styles.signOutBtnText}>Tap In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signOutBtn} >
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