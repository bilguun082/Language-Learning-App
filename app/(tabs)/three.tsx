import { useQuery } from '@apollo/client';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

import { GET_USER } from '../graphql/user';

export default function TabThreeScreen(): React.ReactNode {
  const { user } = useUser();
  const { data, error, loading } = useQuery(GET_USER, {
    variables: {
      username: user?.username,
    },
  });
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

  const handleSignOut = (): void => {
    signOut();
  };

  // console.log(data?.getUser.email);
  const email = data?.getUser?.email;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={{ position: 'absolute', right: 20, top: 60 }}
        onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={36} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username}</Text>

        <Text style={styles.email}>{email}</Text>
      </View>
      {/* <View style={styles.bioContainer}>
        <Text style={styles.bio}>{user.bio}</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
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
