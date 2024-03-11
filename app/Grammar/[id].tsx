// import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import Slider from '@/components/Slider';
// import { Ionicons } from '@expo/vector-icons';x
// import { useRouter } from 'expo-router';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useEffect, useState } from 'react';

export default function Page(): React.ReactNode {
  //   const { id } = useGlobalSearchParams();
  // const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 50,
      }}>
      <Slider />
      {/* <View style={{ gap: 25 }}>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: '../' });
          }}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}>
          Present simple tense — Энгийн одоо цаг
        </Text>
      </View>
      <View>
        <Text>- Давтагдан үйлдэж байгаа үйлийг энэ цагаар илэрхийлдэг.</Text>
        <Text>
          I get up early in the morning — Би өглөө эрт босдог Dorj works in a shop — Дорж дэлгүүрт
          ажилладаг Bat sells newspapers — Бат сонин зардаг Tulga goes to school by bus — Тулга
          сургуульдаа автобусаар явдаг Энэ тохиолдолд үйл хөдлөлийн давтамжийг илэрхийлдэг үгнүүдийг
          өргөн хэрэглэдэг.
        </Text>
      </View> */}
    </View>
  );
}
