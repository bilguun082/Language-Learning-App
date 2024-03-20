import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  item: {
    title: string;
    description: string;
    price: string;
    isLast: boolean;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
  const router = useRouter();
  console.log(item.isLast);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.content}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.price}</Text>
        <TouchableOpacity
          style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
          onPress={() => {
            router.push('/Task?param=1');
          }}>
          <Text>Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 25,
  },
  content: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
});
