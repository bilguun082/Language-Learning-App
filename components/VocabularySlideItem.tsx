import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageSourcePropType,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  item: {
    id: string;
    image: ImageSourcePropType;
    word: string;
    translation: string;
    exampleSentence: string;
    isSaved: boolean;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
  const translateYImage = new Animated.Value(40);
  console.log(item.image);

  Animated.timing(translateYImage, {
    toValue: 0,
    delay: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.image}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

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
