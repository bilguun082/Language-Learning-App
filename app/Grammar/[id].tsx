// import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import Slider from '../../components/Slider';

import { SlideItems } from '@/components/data';
// import { Ionicons } from '@expo/vector-icons';x
// import { useRouter } from 'expo-router';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useEffect, useState } from 'react';

export default function Page(): React.ReactNode {
  //   const { id } = useGlobalSearchParams();
  // const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 50,
      }}>
      <Slider data={SlideItems} />
    </View>
  );
}
