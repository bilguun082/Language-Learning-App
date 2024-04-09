import { useQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { GET_VOCABULARY } from '@/app/graphql/vocabulary';
import Slider from '@/components/VocabularySlider';
// import { GridListItems } from '@/components/data';

export default function Page(): React.ReactNode {
  const { id }: { id: string } = useGlobalSearchParams();
  const { data, error, loading } = useQuery(GET_VOCABULARY, {
    variables: {
      getVocabularyId: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  return (
    <View
      style={{
        paddingTop: 60,
      }}>
      <Slider data={data.getVocabulary} />
    </View>
  );
}
