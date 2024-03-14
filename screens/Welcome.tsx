import * as React from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MMKV } from 'react-native-mmkv'
import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Toast from 'react-native-simple-toast';

export const storage = new MMKV()

export default function Welcome() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const [pin1, setPin1] = React.useState('');
    const [pin2, setPin2] = React.useState('');
    const [pin3, setPin3] = React.useState('');
    const [pin4, setPin4] = React.useState('');
    const [pin5, setPin5] = React.useState('');
    const [pin6, setPin6] = React.useState('');
    const pin1Ref = React.useRef<TextInput>(null);
    const pin2Ref = React.useRef<TextInput>(null);
    const pin3Ref = React.useRef<TextInput>(null);
    const pin4Ref = React.useRef<TextInput>(null);
    const pin5Ref = React.useRef<TextInput>(null);
    const pin6Ref = React.useRef<TextInput>(null);
    const isFocused = useIsFocused();
    const pin = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;

    const handlePinSubmit = () => {
        if (pin.length === 6) {
            storage.set('user_pin', pin);
            Alert.alert('SUCCESS','PIN created');
            navigation.navigate('SetNickname' as never);
        } else {
            // console.log("PIN must be 6 digits long.");
            Alert.alert('OOPS','PIN must be 6 digits long.');
        }
    };


    const handlePin1Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin1(filteredText);
        if (filteredText === '') {
            pin1Ref.current?.focus();
        } else {
            pin2Ref.current?.focus();
        }
    };

    const handlePin2Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin2(filteredText);
        if (filteredText === '') {
            pin1Ref.current?.focus();
        } else {
            pin3Ref.current?.focus();
        }
    };

    const handlePin3Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin3(filteredText);
        if (filteredText === '') {
            pin2Ref.current?.focus();
        } else {
            pin4Ref.current?.focus();
        }
    };

    const handlePin4Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin4(filteredText);
        if (filteredText === '') {
            pin3Ref.current?.focus();
        } else {
            pin5Ref.current?.focus();
        }
    };

    const handlePin5Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin5(filteredText);
        if (filteredText === '') {
            pin4Ref.current?.focus();
        } else {
            pin6Ref.current?.focus();
        }
    };
    const handlePin6Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin6(filteredText);
        if (filteredText === '') {
            pin5Ref.current?.focus();
        } else {
            pin6Ref.current?.focus();
        }
    };

    /////welcomeBack
    const [pin11, setPin11] = React.useState('');
    const [pin22, setPin22] = React.useState('');
    const [pin33, setPin33] = React.useState('');
    const [pin44, setPin44] = React.useState('');
    const [pin55, setPin55] = React.useState('');
    const [pin66, setPin66] = React.useState('');
    const pin11Ref = React.useRef<TextInput>(null);
    const pin22Ref = React.useRef<TextInput>(null);
    const pin33Ref = React.useRef<TextInput>(null);
    const pin44Ref = React.useRef<TextInput>(null);
    const pin55Ref = React.useRef<TextInput>(null);
    const pin66Ref = React.useRef<TextInput>(null);
    const pinn = `${pin11}${pin22}${pin33}${pin44}${pin55}${pin66}`;

    useEffect(() => {
        if (pinn.length === 6) {
            if (pinn === userPin) {
                navigation.navigate('Home' as never);
            } else {
                setModalVisible(true);
                setPin11('');
                setPin22('');
                setPin33('');
                setPin44('');
                setPin55('');
                setPin66('');
                pin11Ref.current?.focus();
            }
        }
    }, [pinn]);


    const handlePin11Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin11(filteredText);
        if (filteredText === '') {
            pin11Ref.current?.focus();
        } else {
            pin22Ref.current?.focus();
        }
    };

    const handlePin22Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin22(filteredText);
        if (filteredText === '') {
            pin11Ref.current?.focus();
        } else {
            pin33Ref.current?.focus();
        }
    };

    const handlePin33Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin33(filteredText);
        if (filteredText === '') {
            pin22Ref.current?.focus();
        } else {
            pin44Ref.current?.focus();
        }
    };

    const handlePin44Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin44(filteredText);
        if (filteredText === '') {
            pin33Ref.current?.focus();
        } else {
            pin55Ref.current?.focus();
        }
    };

    const handlePin55Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin55(filteredText);
        if (filteredText === '') {
            pin44Ref.current?.focus();
        } else {
            pin66Ref.current?.focus();
        }
    };
    const handlePin66Change = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setPin66(filteredText);
        if (filteredText === '') {
            pin55Ref.current?.focus();
        } else {
            pin66Ref.current?.focus();
        }
    };

    const userPin = storage.getString('user_pin');
    // console.log('welcome:', userPin);
    const nickname = storage.getString('nickname');

    useEffect(() => {
        setPin1('');
        setPin2('');
        setPin3('');
        setPin4('');
        setPin5('');
        setPin6('');
        setPin11('');
        setPin22('');
        setPin33('');
        setPin44('');
        setPin55('');
        setPin66('');
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            {userPin == null ? (
                <>
                    <View style={styles.pinContainer}>
                        <View style={styles.pinTextContainer}>
                            <Text style={styles.pinTitle}>
                                Create PIN
                            </Text>
                            <Text style={styles.pinDescr}>
                                Please enter 6-digit passcode.
                            </Text>
                        </View>
                        <View style={styles.pinInputContainer}>
                            <TextInput
                                ref={pin1Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin1Change}
                                value={pin1}
                            />
                            <TextInput
                                ref={pin2Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin2Change}
                                value={pin2}
                            />
                            <TextInput
                                ref={pin3Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin3Change}
                                value={pin3}
                            />
                            <TextInput
                                ref={pin4Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin4Change}
                                value={pin4}
                            />
                            <TextInput
                                ref={pin5Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin5Change}
                                value={pin5}
                            />
                            <TextInput
                                ref={pin6Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin6Change}
                                value={pin6}
                            />
                        </View>
                    </View>
                    <View style={styles.submitBtnContainer}>
                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={handlePinSubmit}>
                            <View style={styles.submitContent}>
                                <Text style={styles.submitText}>SUBMIT</Text>
                                <Icon
                                    name="arrow-forward"
                                    size={20}
                                    style={styles.forwardIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </>) : (
                <>
                    <View style={styles.pinContainer}>
                        <View style={styles.pinTextContainer}>
                            <Text style={styles.pinTitle2}>
                                Welcome back, {nickname}
                            </Text>
                            <Text style={styles.pinDescr}>
                                Enter your 6-digit passcode.
                            </Text>
                        </View>
                        <View style={styles.pinInputContainer}>
                            <TextInput
                                ref={pin11Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin11Change}
                                value={pin11}
                            />
                            <TextInput
                                ref={pin22Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin22Change}
                                value={pin22}
                            />
                            <TextInput
                                ref={pin33Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin33Change}
                                value={pin33}
                            />
                            <TextInput
                                ref={pin44Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin44Change}
                                value={pin44}
                            />
                            <TextInput
                                ref={pin55Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin55Change}
                                value={pin55}
                            />
                            <TextInput
                                ref={pin66Ref}
                                style={styles.pinInput}
                                keyboardType="numeric"
                                maxLength={1}
                                secureTextEntry={true}
                                onChangeText={handlePin66Change}
                                value={pin66}
                            />
                        </View>
                    </View>

                    {/* modal incorrect PIN */}
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
                                <Text style={styles.modalText}>Incorrect PIN.</Text>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </>)}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fcf4e7',
        justifyContent: 'center',
    },
    pinContainer: {
        // alignItems: 'center',
        paddingHorizontal: 20,
    },
    pinTextContainer: {
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginBottom: 40,
    },
    pinTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: 'black',
    },
    pinTitle2: {
        fontSize: 24,
        fontWeight: '900',
        color: 'black',
    },
    pinDescr: {
        marginLeft: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#888',
    },
    pinInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinInput: {
        backgroundColor: 'white',
        height: 45,
        width: 45,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#262020',
        borderRadius: 10,
        marginHorizontal: 5,
        textAlign: 'center',
        color: '#262020',
    },
    submitBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 40,
        marginTop: 50,

    },
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        paddingRight: 15,
        borderRadius: 50,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        backgroundColor: '#ffb301',
    },
    submitContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    submitText: {
        fontWeight: '900',
        color: '#262020',
    },
    forwardIcon: {
        color: '#262020',
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
    },
});