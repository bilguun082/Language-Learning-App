import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  item: {
    title: string;
    image: string;
    fact: string;
    exampleSentence: string;
    isLast: boolean;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
  const router = useRouter();
  console.log(item);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Хичээл</Text>
      <View style={styles.content}>
        <Image
          source={{
            uri: item.image,
          }}
          width={300}
          height={200}
        />
        <Text style={styles.description}>{item.fact}</Text>
        <Text style={styles.description}>{item.exampleSentence}</Text>
        {item.isLast && (
          <TouchableOpacity
            style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
            onPress={() => {
              router.push({
                pathname: '/Task/',
                params: { title: item.title },
              });
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
        )}
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
