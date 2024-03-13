import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';

export default function Page(): React.ReactNode {
  const GridListItems = [
    { id: 1, key: 'Skptricks' },
    { id: 2, key: 'Sumit' },
    { id: 3, key: 'Amit' },
    { id: 4, key: 'React' },
    { id: 5, key: 'React Native' },
    { id: 6, key: 'Java' },
    { id: 7, key: 'Javascript' },
    { id: 8, key: 'PHP' },
    { id: 9, key: 'AJAX' },
    { id: 10, key: 'Android' },
    { id: 11, key: 'Selenium' },
    { id: 12, key: 'HTML' },
  ];

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Vocab title</Text>
      <FlatList
        data={GridListItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.GridViewContainer}
            onPress={() => {
              router.push({
                pathname: '/Vocabulary/[id]/[id]',
                params: { id: item.id },
              });
            }}>
            <Text style={styles.GridViewTextLayout}> {item.key} </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
  // return (
  //   <View style={{ flex: 1, alignItems: 'center', padding: 15, paddingTop: 50 }}>
  //     <Text>Vocab detail page</Text>
  //     <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}></View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#c77dff',
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
  },
});