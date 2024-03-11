// import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useEffect, useState } from 'react';

export default function Page(): React.ReactNode {
  //   const { id } = useGlobalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Link href={'../'}>Go back</Link> */}
      <Text>Vocab detail page</Text>
    </View>
  );
}
