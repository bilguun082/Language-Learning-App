import { useSignIn } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default function SignInScreen(): React.ReactNode {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async (): Promise<void> => {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err) {
      alert(err);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async (): Promise<void> => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      if (!result) {
        throw new Error('signIn is null or undefined');
      }

      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive?.({ session: result.createdSessionId });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <TouchableOpacity
            onPress={() => {
              onRequestReset();
            }}>
            <View style={styles.button}>
              <Text style={styles.text}>Send Reset Email</Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onReset();
            }}>
            <View style={styles.button}>
              <Text style={styles.text}>Reset Password</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#5E5DF0',
    borderRadius: 999,
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    width: 200,
    alignItems: 'center',
    margin: 10,
    opacity: 1,
    paddingTop: 8,
    paddingRight: 18,
    paddingBottom: 8,
    paddingLeft: 18,
  },
  text: {
    fontSize: 16,
    fontWeight: '700', // Change to string value
    lineHeight: 24,
    color: 'white',
  },
});
