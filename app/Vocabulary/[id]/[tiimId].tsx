import { useQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { GET_VOCABULARY } from '@/app/graphql/vocabulary';
import Slider from '@/components/VocabularySlider';
export default function Page(): React.ReactNode {
  const params = useGlobalSearchParams();
  const { data, error, loading } = useQuery(GET_VOCABULARY, {
    variables: {
      getVocabularyId: params.id,
    },
  });

  console.log(data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  return (
    <View
      style={{
        paddingTop: 50,
      }}>
      <Slider data={data} />
    </View>
  );
}
