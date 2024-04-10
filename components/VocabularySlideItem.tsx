import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    word: string;
    translation: string;
    exampleSentence: string;
    isSaved: boolean;
    isLast: boolean;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.word} - {item.translation}
        </Text>
        {/* <Text style={styles.description}>{item.translation}</Text> */}
        <Text style={styles.price}>{item.exampleSentence}</Text>
        {item.isLast && (
          <TouchableOpacity
            style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}
            onPress={() => {
              router.push({
                pathname: '/VocabTest/',
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
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  image: {
    flex: 0.5,
    width: '100%',
  },
  content: {
    flex: 0.5,
    marginTop: 40,
    paddingLeft: 30,
    width: '100%',
    gap: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
});
