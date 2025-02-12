import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = (): React.JSX.Element => {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Grammar/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Vocabulary/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="Reset" options={{ headerShown: false }} />
      </Stack>
    </AuthGuard>
  );
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/SignIn');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default InitialLayout;
