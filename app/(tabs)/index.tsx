import { Link, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import WordType from '@/components/WordType';
import { useUser } from '@clerk/clerk-expo';

const lessons = [
  {
    id: '1',
    lesson: 1,
    title: 'Hicheel 1',
  },
  {
    id: '2',
    lesson: 2,
    title: 'Hicheel 2',
  },
  {
    id: '3',
    lesson: 3,
    title: 'Hicheel 3',
  },
  {
    id: '4',
    lesson: 4,
    title: 'Hicheel 4',
  },
  {
    id: '5',
    lesson: 5,
    title: 'Hicheel 5',
  },
  {
    id: '6',
    lesson: 6,
    title: 'Hicheel 6',
  },
  {
    id: '7',
    lesson: 7,
    title: 'Hicheel 7',
  },
  {
    id: '8',
    lesson: 8,
    title: 'Hicheel 8',
  },
];

export default function TabOneScreen(): React.ReactNode {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  console.log(user?.fullName);

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.userView}>
              <View>
                {Boolean(isSignedIn) ? (
                  <Text style={styles.header}>Сайн уу {user?.fullName},</Text>
                ) : (
                  <Link href={'/SignIn/'}>
                    <Text style={styles.header}>Нэвтрэх</Text>
                  </Link>
                )}

                <Text style={styles.title}>Continue to English!</Text>
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
              Таны хичээлүүд
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
