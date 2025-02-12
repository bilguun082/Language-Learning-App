import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#c77dff', tabBarInactiveTintColor: 'gray' }}>
      {/* Tab for the home screen */}
      <Tabs.Screen
        name="index" // This corresponds to 'app/tabs/index.tsx'
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />,
        }}
      />

      {/* Tab for the second screen */}
      <Tabs.Screen
        name="two" // This corresponds to 'app/tabs/two.tsx'
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="newspaper-outline" size={28} color={color} />,
        }}
      />

      {/* Tab for the third screen */}
      <Tabs.Screen
        name="three" // This corresponds to 'app/tabs/three.tsx'
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
