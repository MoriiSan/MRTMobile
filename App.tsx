import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [pin1, setPin1] = React.useState('');
  const [pin2, setPin2] = React.useState('');
  const [pin3, setPin3] = React.useState('');
  const [pin4, setPin4] = React.useState('');
  const pin1Ref = React.useRef<TextInput>(null);
  const pin2Ref = React.useRef<TextInput>(null);
  const pin3Ref = React.useRef<TextInput>(null);
  const pin4Ref = React.useRef<TextInput>(null);

  const handlePin1Change = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
    setPin1(filteredText);
    if (filteredText === '') {
      pin1Ref.current?.focus();
    } else {
      pin2Ref.current?.focus();
    }
  };

  const handlePin2Change = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
    setPin2(filteredText);
    if (filteredText === '') {
      pin1Ref.current?.focus();
    } else {
      pin3Ref.current?.focus();
    }
  };

  const handlePin3Change = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
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
    pin4Ref.current?.focus();
  }
};


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
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => console.log('Submit btn pressed')}
            >
              <Text
                style={styles.submitText}
              >Submit
              </Text>
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
    marginTop: 200,
  },
  pinTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
  },
  pinDescr: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888',
    marginBottom: 25,
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
    paddingHorizontal: 75,
    borderRadius: 5,
    backgroundColor: '#ffb301',
  },
  submitText: {
    fontWeight: '900',
    color: 'white',
  }
});

export default App;
