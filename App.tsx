import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView>
          <View style={styles.pinContainer}>
            <Text style={styles.pinTitle}>
              Welcome to MRT Mobile
            </Text>
            <Text style={styles.pinDescr}>
              Enter your 4-digit passcode
            </Text>
            <View style={styles.pinInputContainer}>
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => console.log('Submit btn pressed')}
            >
              <Text
                style={styles.submitText}
              >Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pinTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
    marginBottom: 10,
  },
  pinDescr: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888',
    marginBottom: 20,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInput: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  submitBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ffb301',
  },
  submitText: {
    fontWeight: '900',
  }
});

export default App;
