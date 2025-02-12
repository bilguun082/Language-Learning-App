import { useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { GET_ALL_VOCABULARIES } from '../graphql/vocabulary';

import WordType from '@/components/WordType';

const TabTwoScreen: React.FC = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(GET_ALL_VOCABULARIES);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error) return <Text>Error :</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.getAllVocabularies}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.userView}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
                onPress={() => {
                  router.push({
                    pathname: '/(tabs)/three',
                  });
                }}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
                  }}
                  width={50}
                  height={50}
                  style={{ borderRadius: 50 }}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Үгийн санг чинь сайжруулъя😎</Text>
                {/* <Text style={styles.title}>Хичээл</Text> */}
              </View>
            </View>
            <Text
              style={{
                marginLeft: 30,
                fontSize: 20,
                fontStyle: 'italic',
                marginBottom: 20,
                marginTop: 20,
              }}>
              Сэдвүүд
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
            onPress={() => {
              router.push({
                pathname: '/Vocabulary/[id]',
                params: { id: item.id },
              });
            }}>
            <WordType title={item.title} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    backgroundColor: '#0000',
  },
  userView: {
    flexDirection: 'column',
    width: '100%',
    height: 250,
    backgroundColor: '#c77dff',
    justifyContent: 'space-between',
    paddingTop: 60,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 40,
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  contentContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 40,
    height: 'auto',
    overflow: 'scroll',
  },
  scroll: {
    padding: 5,
  },
});

export default TabTwoScreen;
