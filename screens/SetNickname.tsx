import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
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
import { useState } from 'react';
import { Modal } from 'react-native';
import Toast from 'react-native-simple-toast';


export const storage = new MMKV()

export default function SetNickname() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [nickname, setNickname] = useState('');

    const handleNicknameSubmit = () => {
        const nicknameSet = nickname.trim();
        if (nicknameSet) {
            storage.set('nickname', nicknameSet);
            Alert.alert('INFO','Nickname set');
            navigation.navigate('Home' as never);
        } else {
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pinContainer}>
                <View style={styles.pinTextContainer}>
                    <Text style={styles.pinTitle}>
                        Create a nickname
                    </Text>
                    <Text style={styles.pinDescr}>
                        Please enter a nickname.
                    </Text>
                </View>
                <View style={styles.pinInputContainer}>
                    <TextInput
                        style={styles.pinInput}
                        // maxLength={1}
                        onChangeText={setNickname}
                        value={nickname}
                    />
                </View>
            </View>
            <View style={styles.submitBtnContainer}>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleNicknameSubmit}>
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

            {/* modal no nickname set */}
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
                        <Text style={styles.modalText}>No nickname set.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        flex: 1,
        height: 45,
        // width: 45,
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