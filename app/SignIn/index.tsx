import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SignInScreen(): React.ReactNode {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.push('/(tabs)');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity
        onPress={() => {
          onSignInPress();
        }}>
        <View style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </View>
      </TouchableOpacity>

      <Link href="/Reset/" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/SignUp/" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
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
