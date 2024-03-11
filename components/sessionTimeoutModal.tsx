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
        // Handle logic for OK button click here
        // simple that that says that app has timed out
        setTimeout(() => {
            RNExitApp.exitApp(); // Exit the app after 1 second
        }, 1000);
    };

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>&times;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                    <Text style={styles.textStyle}>{message}</Text>
                </View>
                <View style={styles.modalFooter}>
                    <TouchableOpacity onPress={handleOk} style={styles.okButton}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        color: 'black',
        fontSize: 18,
    },
    modalBody: {
        marginBottom: 20,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    okButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    okButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textStyle: {
        color: 'black'
    },
});

export default SessionModal;
