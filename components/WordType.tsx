import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WordType({
  lesson,
  title,
}: {
  lesson: number;
  title: string;
}): React.ReactNode {
  return (
    <View style={{ ...styles.container, ...styles.shadowProp }}>
      <Feather name="file-text" size={24} color="black" />
      <Text>{title}</Text>
      {/* <BookIcon /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    width: '100%',
    height: 60,
    padding: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
