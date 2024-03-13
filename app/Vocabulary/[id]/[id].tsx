import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Page(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Vocab title</Text>
    </View>
  );
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
});
