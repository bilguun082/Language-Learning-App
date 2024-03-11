import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#c77dff', tabBarInactiveTintColor: 'gray' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="newspaper-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
