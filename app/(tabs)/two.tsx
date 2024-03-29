import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import WordType from '@/components/WordType';
import { useRouter } from 'expo-router';

const lessons = [
  {
    id: '1',
    lesson: 1,
    title: 'Сэдэв 1',
  },
  {
    id: '2',
    lesson: 2,
    title: 'Сэдэв 2',
  },
  {
    id: '3',
    lesson: 3,
    title: 'Сэдэв 3',
  },
  {
    id: '4',
    lesson: 4,
    title: 'Сэдэв 4',
  },
  {
    id: '5',
    lesson: 5,
    title: 'Сэдэв 5',
  },
  {
    id: '6',
    lesson: 6,
    title: 'Сэдэв 6',
  },
  {
    id: '7',
    lesson: 7,
    title: 'Сэдэв 7',
  },
  {
    id: '8',
    lesson: 8,
    title: 'Сэдэв 8',
  },
];

export default function TabOneScreen(): React.ReactNode {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.userView}>
              <View>
                <Text style={styles.title}>Үгийн сан</Text>
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
              Таны сэдвүүд
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
            <WordType lesson={item.lesson} title={item.title} />
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
  },
  userView: {
    flexDirection: 'column',
    width: '100%',
    height: 250,
    backgroundColor: '#c77dff',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 40,
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
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
