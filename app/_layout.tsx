import { Stack } from 'expo-router';

const RootLayoutNav: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Grammar/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Vocabulary/[id]/index" options={{ headerShown: false }} />
      <Stack.Screen name="Vocabulary/[id]/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Task/index" options={{ headerShown: false }} />
      <Stack.Screen name="VocabTest" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayoutNav;
