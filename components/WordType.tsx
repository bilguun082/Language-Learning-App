import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WordType({
  title,
  isSaved,
}: {
  title: string;
  isSaved: boolean;
}): React.ReactNode {
  return (
    <View style={{ ...styles.container, ...styles.shadowProp }}>
      <Feather name="file-text" size={24} color="#c77dff" />
      <Text style={{ color: 'black', fontSize: 15 }}>{title}</Text>
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
    height: 80,
    padding: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#fff',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
