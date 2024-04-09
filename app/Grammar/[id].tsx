import { useQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import Slider from '../../components/Slider';
import { GET_LESSON } from '../graphql/lesson';

// import { SlideItems } from '@/components/data';
// import { Ionicons } from '@expo/vector-icons';x
// import { useRouter } from 'expo-router';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useEffect, useState } from 'react';

export default function Page(): React.ReactNode {
  const { id } = useGlobalSearchParams();
  const { data, error, loading } = useQuery(GET_LESSON, {
    variables: {
      getLessonId: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;
  // const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 50,
      }}>
      <Slider data={data?.getLesson} />
    </View>
  );
}
