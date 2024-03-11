import { Stack } from 'expo-router';

const RootLayoutNav: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Grammar/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Vocabulary/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayoutNav;
