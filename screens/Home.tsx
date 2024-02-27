import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BeepCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>Beep Card</Text>
            <Text style={styles.cardBalance}>Balance: PHP 100.00</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        margin: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 200,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardBalance: {
        fontSize: 16,
        color: '#888888',
    },
});
