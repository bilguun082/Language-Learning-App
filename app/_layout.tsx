import { ClerkProvider } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

const RootLayoutNav: React.FC = () => {
  return (
    <ClerkProvider publishableKey={`${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Grammar/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Vocabulary/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
