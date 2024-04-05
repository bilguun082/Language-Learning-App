import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  item: {
    id: string;
    image: string;
    word: string;
    translation: string;
    exampleSentence: string;
    isSaved: boolean;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} width={300} height={240} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.word}</Text>
        <Text style={styles.description}>{item.translation}</Text>
        <Text style={styles.price}>{item.exampleSentence}</Text>
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
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
