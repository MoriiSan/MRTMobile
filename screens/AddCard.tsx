import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import Toast from 'react-native-simple-toast';

export default function AddCard() {
    const navigation = useNavigation();
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const { hasPermission, requestPermission } = useCameraPermission()
    const [cameraVisible, setCameraVisible] = useState(false);

    const device = useCameraDevice('back')

    const fetchDeviceId = async () => {
        try {
            const id = await DeviceInfo.getUniqueId();
            setDeviceId(id);
            // console.log(id);
        } catch (error) {
            console.error('Error fetching device ID:', error);
        }
    };

    const saveCard = async () => {
        console.log('Linking card');
        try {
            const response = await fetch(`https://mrt-system-be.onrender.com/cards/linkCard/${number}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ devId: deviceId }),
            });
            if (response.ok) {
                console.log('Card linked successfully');
                Toast.show(
                    'Card linked successfully',
                    0.5,
                );
                navigation.navigate('Home' as never);
                onChangeNumber('');
                onChangeText('');
            } else {
                console.log('Failed to link card');
                Toast.show(
                    'Failed to link card',
                    0.5,
                );
                onChangeNumber('');
                onChangeText('');
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error linking card:', error);
            Toast.show(
                'Error linking card',
                0.5,
            );
        }
    };

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
                console.log(`Scanned ${value}!`);
                onChangeNumber(value!);
                setCameraVisible(false);
                Toast.show(
                    'QR scanned',
                    0.5,
                );
            }
        }
    })

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
                    Link a MRT Card
                </Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                    onPress={() => toggleCamera()}>
                    {/* <Text style={{ color: 'black', marginRight: 10 }}>QR</Text>
                     */}
                    <Icon
                        name="scan-circle-outline"
                        size={35}
                        style={styles.goBackIcon}
                    />
                </TouchableOpacity>
            </View>
            <View >
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>MRT Card Number (10 digits)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='* * * * * * * * * *'
                        placeholderTextColor='#a1aab8'
                        onChangeText={(value) => {
                            const regex = /^[0-9\b]+$/;
                            if (regex.test(value) || value === '') {
                                onChangeNumber(value);
                            }
                        }}
                        value={number}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>
                {/* <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Card Label (optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g Beep'
                        placeholderTextColor='#a1aab8'
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View> */}
            </View>

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

            <View style={styles.saveContainer}>
                <TouchableOpacity
                    onPress={saveCard}>
                    <Text style={styles.saveBtnText}>Save Card</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for already linked card */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>This card is already linked.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden', // Ensure the scan region is contained within this container
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
    inputContainer: {
        margin: 15,
        gap: 5,
    },
    input: {
        height: 50,
        padding: 15,
        color: '#262020',
        backgroundColor: 'white',
        borderColor: '#262020',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 10,
    },
    inputLabel: {
        color: '#717781',
        marginLeft: 10,
    },
    saveContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        margin: 15,
        backgroundColor: '#fece2e',
        borderColor: '#262020',
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    saveBtnText: {
        color: '#262020',
        fontWeight: '500',
    },
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    }
});
