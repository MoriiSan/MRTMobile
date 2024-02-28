import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';



export default function AddCard() {
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');

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
            </View>
            <View >
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>MRT Card Number (10 digits)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='* * * * * * * * * *'
                        placeholderTextColor='#a1aab8'
                        onChangeText={onChangeNumber}
                        value={number}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Card Label (optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g Beep'
                        placeholderTextColor='#a1aab8'
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View>
            </View>
            <View style={styles.saveContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home' as never)}>
                    <Text style={styles.saveBtnText}>Save Card</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
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
});
