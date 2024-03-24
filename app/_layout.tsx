import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

const RootLayoutNav: React.FC = () => {
  const InitialLayout = (): React.JSX.Element => {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    // If the user is signed in, redirect them to the home page
    // If the user is not signed in, redirect them to the login page
    useEffect(() => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        router.replace('/SignIn/');
      }
    }, [isSignedIn]);

    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Grammar/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Vocabulary/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="Reset" options={{ headerShown: false }} />
      </Stack>
    );
  };

  return (
    <ClerkProvider publishableKey={`${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;
