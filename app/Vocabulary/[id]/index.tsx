import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';

import { GridListItems } from '@/components/data';

export default function Page(): React.ReactNode {
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
            <Text style={styles.GridViewTextLayout}> {item.title} </Text>
            <TouchableOpacity
              style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
              onPress={() => {
                router.push('/VocabTest/');
              }}>
              <View
                style={{
                  backgroundColor: '#5E5DF0',
                  borderRadius: 999,
                  shadowColor: '#5E5DF0',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  opacity: 1,
                  paddingTop: 8,
                  paddingRight: 18,
                  paddingBottom: 8,
                  paddingLeft: 18,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700', // Change to string value
                    lineHeight: 24,
                    color: 'white',
                  }}>
                  Test
                </Text>
              </View>
            </TouchableOpacity>
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
