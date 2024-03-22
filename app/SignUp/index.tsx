import { useSignUp } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SignUpScreen(): React.ReactNode {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
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

          <Button onPress={() => onSignUpPress} title="Sign up" color={'#6c47ff'} />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
          </View>
          <Button onPress={() => onPressVerify} title="Verify Email" color={'#6c47ff'} />
        </>
      )}
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

// import { useSignUp } from '@clerk/clerk-expo';
// import * as React from 'react';
// import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function SignUpScreen(): React.ReactNode {
//   const { isLoaded, signUp, setActive } = useSignUp();

//   const [firstName, setFirstName] = React.useState('');
//   const [lastName, setLastName] = React.useState('');
//   const [emailAddress, setEmailAddress] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState('');

//   // start the sign up process.
//   const onSignUpPress = async (): Promise<void> => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       await signUp.create({
//         firstName,
//         lastName,
//         emailAddress,
//         password,
//       });

//       // send the email.
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

//       // change the UI to our pending section.
//       setPendingVerification(true);
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // This verifies the user using email code that is delivered.
//   const onPressVerify = async (): Promise<void> => {
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       await setActive({ session: completeSignUp.createdSessionId });
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   return (
//     <View>
//       {!pendingVerification && (
//         <View>
//           <View>
//             <TextInput
//               autoCapitalize="none"
//               value={firstName}
//               placeholder="First Name..."
//               onChangeText={(firstName) => setFirstName(firstName)}
//             />
//           </View>
//           <View>
//             <TextInput
//               autoCapitalize="none"
//               value={lastName}
//               placeholder="Last Name..."
//               onChangeText={(lastName) => setLastName(lastName)}
//             />
//           </View>
//           <View>
//             <TextInput
//               autoCapitalize="none"
//               value={emailAddress}
//               placeholder="Email..."
//               onChangeText={(email) => setEmailAddress(email)}
//             />
//           </View>

//           <View>
//             <TextInput
//               value={password}
//               placeholder="Password..."
//               placeholderTextColor="#000"
//               secureTextEntry={true}
//               onChangeText={(password) => setPassword(password)}
//             />
//           </View>

//           <TouchableOpacity onPress={onSignUpPress}>
//             <Text>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {pendingVerification && (
//         <View>
//           <View>
//             <TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
//           </View>
//           <TouchableOpacity onPress={onPressVerify}>
//             <Text>Verify Email</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }
