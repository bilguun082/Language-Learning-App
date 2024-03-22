import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text } from 'react-native';
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

      <Button onPress={() => onSignInPress} title="Login" color="#6c47ff" />

      {/* <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link> */}
      <Link href="/SignUp/" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
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
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

// import { useSignIn } from '@clerk/clerk-expo';
// import React from 'react';
// import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function SignInScreen(): React.ReactNode {
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const [emailAddress, setEmailAddress] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const onSignInPress = async (): Promise<void> => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const completeSignIn = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });
//       // This is an important step,
//       // This indicates the user is signed in
//       await setActive({ session: completeSignIn.createdSessionId });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <View>
//       <View>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Email..."
//           onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//         />
//       </View>

//       <View>
//         <TextInput
//           value={password}
//           placeholder="Password..."
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//       </View>

//       <TouchableOpacity onPress={onSignInPress}>
//         <Text>Sign in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
