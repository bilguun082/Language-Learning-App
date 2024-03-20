import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  // Text,
  // TouchableOpacity,
  View,
} from 'react-native';

import Pagination from './Pagination';
import SlideItem from './SlideItem';

type SliderProps = {
  data: {
    id: number;
    title: string;
    description: string;
    price: string;
    isLast: boolean;
  }[];
};

const Slider: React.FC<SliderProps> = ({ data }: SliderProps) => {
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

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
      if (viewableItems.length > 0) {
        setIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* <TouchableOpacity>
        <Text>Дасгал ажиллах</Text>
      </TouchableOpacity> */}
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;
