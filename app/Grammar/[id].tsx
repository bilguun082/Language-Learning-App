import { useQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

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

  if (loading || !data)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
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
