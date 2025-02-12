import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBarBottom from '@/components/ui/TabBarBottom';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            // position: 'absolute',
          },
          default: {
            position: 'absolute',
            bottom: 25,
            marginLeft: 75,
            marginRight: 75,
            backgroundColor: '#fff',
            borderRadius: 25,
            height: 70,
            shadowColor: '#7F5DF0',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },
        }),
      }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: '', 
          tabBarIcon: ({ focused }) => (
            <TabBarBottom
              focused={focused}
              image={require('@/assets/icons/home.png')}
              title="Home"
            />
          ),
        }}
        
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: '', 
          tabBarIcon: ({ focused }) => (
            <TabBarBottom
              focused={focused}
              image={require('@/assets/icons/user.png')}
              title="Profile"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(about)/index"
        options={{
          title: '', 
          tabBarIcon: ({ focused }) => (
            <TabBarBottom
              focused={focused}
              image={require('@/assets/icons/special_thanks.png')}
              title="About"
            />
          ),
        }}
      />
    </Tabs>
  );
}
