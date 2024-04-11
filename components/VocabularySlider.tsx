import React, { useRef, useState } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import Pagination from './VocabularyPagination';
import SlideItem from './VocabularySlideItem';

type SliderProps = {
  data: {
    id: string;
    title: string;
    words: Word[][];
  };
};

type Word = {
  id: string;
  image: string;
  word: string;
  translation: string;
  exampleSentence: string;
  isSaved: boolean;
};

const Slider: React.FC<SliderProps> = ({ data }: SliderProps) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: { index: number }[] }) => {
      setIndex(viewableItems[0].index);
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  if (!data) return null;
  if (!data.words) return null;

  return (
    <View>
      <FlatList
        data={data.words}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;
