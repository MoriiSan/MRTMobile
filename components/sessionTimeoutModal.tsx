import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNExitApp from 'react-native-exit-app';

interface SessionModalProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const SessionModal: React.FC<SessionModalProps> = ({ isVisible, onClose, title, message }) => {
    if (!isVisible) {
        return null;
    }

    const handleOk = () => {
        setTimeout(() => {
            RNExitApp.exitApp();
        }, 1000);
    };

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>
                </View>
                <View style={styles.modalBody}>
                    <Text style={styles.textStyle}>{message}</Text>
                </View>
                <View style={styles.modalFooter}>
                    <TouchableOpacity onPress={handleOk} style={styles.okButton}>
                        <Text style={styles.okButtonText}>Exit app</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        margin: 20,
        backgroundColor: "#a8d5e5",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        borderWidth: 1.5,
        width: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        color: '#262020',
        fontSize: 18,
        fontWeight: '800',
    },
    modalBody: {
        marginBottom: 20,
    },
    modalFooter: {
        borderRadius: 10,
        width: '100%',
    },
    okButton: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: "white",
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },
    okButtonText: {
        color: '#262020',
        fontWeight: 'bold',
    },
    textStyle: {
        color: '#262020'
    },
});

export default SessionModal;
