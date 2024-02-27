import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <Text
                    style={styles.homeWelcome}
                >Hello, User
                </Text>
                <Icon 
                name="person"
                size={25}
                style={styles.icon}
                onPress={()=>navigation.navigate('Account' as never)} />
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>Beep Card</Text>
                <Text style={styles.cardBalance}>Balance: PHP 100.00</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        backgroundColor: '#ffb301',
        padding: 10,
    },
    icon: {
        color: '#222',
    },
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
    homeWelcome: {
        fontWeight: '700',
        fontSize: 22,
        color: '#222',
    }
});
