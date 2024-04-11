import { useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { GET_ALL_LESSONS } from '../graphql/lesson';

import WordType from '@/components/WordType';

export default function TabOneScreen(): React.ReactNode {
  const { data, error, loading } = useQuery(GET_ALL_LESSONS);
  // const [data,setData ] = useState()
  const router = useRouter();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.getAllLessons}
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
                <Text style={styles.title}>Эргэн тавтай морил😇</Text>
                {/* <Text style={styles.title}>Хичээл</Text> */}
              </View>
            </View>
            <Text
              style={{
                marginLeft: 30,
                fontSize: 20,
                color: 'black',
                fontStyle: 'italic',
                marginBottom: 20,
                marginTop: 20,
              }}>
              Хичээлүүд
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
            onPress={() => {
              router.push({
                pathname: '/Grammar/[id]',
                params: { id: item.id },
              });
            }}>
            <WordType title={item.title} isSaved={item.isSaved} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

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
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 40,
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
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
