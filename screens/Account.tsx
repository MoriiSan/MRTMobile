import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';



export default function Account() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Icon
                    name="exit"
                    size={25}
                    onPress={() => navigation.navigate('Welcome' as never)} />
                <Text
                    style={{
                        color: '#222222',
                    }}
                >Account
                </Text>
                <Text></Text>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
