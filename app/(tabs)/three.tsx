import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function TabThreeScreen(): React.ReactNode {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar:
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut libero nec elit ultrices elementum.',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image src={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  bioContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});
