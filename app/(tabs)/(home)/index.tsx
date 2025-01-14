import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import StoriesChannel from '@/components/StoriesChannel';
import CarouselHeader from '@/components/CarouselHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://bogorstore.com/agoose/api/';

export default function HomeScreen() {
  const [storiesChannel, setstoriesChannel] = useState(null);
  const colorScheme = useColorScheme();

  const fetchstoriesChannel = () => {
    axios
      .get('/posts/stories')
      .then(res => {
        console.log('data1',res.data);
        setstoriesChannel(res.data);
        savestoriesChannel(res.data);
      })
      .catch(err => {
        AsyncStorage.getItem('savestoriesChannel', (error, data) => {
          if (data) {
            setstoriesChannel(JSON.parse(data));
          }
        });
        console.log(err);
      });
  };
  
  const savestoriesChannel = async data => {
    try {
      await AsyncStorage.setItem('savestoriesChannel', JSON.stringify(data));
    } catch (e) {
      console.log(e + 'Failed to save the Stories Chaneel to the storage');
    }
  };
  
  useEffect(() => {
    fetchstoriesChannel();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Colors[colorScheme ?? 'light'].softBlue }}>
      <StatusBar backgroundColor={Colors[colorScheme ?? 'light'].softBlue} barStyle="dark-content" />
      <View style={{ height: 60 }}>{Header("namess")}</View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: Colors[colorScheme ?? 'light'].softBlue }}>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? 'light'].softBlue,
          }}>
          {/* Stories Section */}
          {StoriesChannel(storiesChannel)}
          {/* Slider Caraousel */}
          {/* {CarouselHeader('carousel')} */}
          {/* My Stories */}
          {/* <View>{StoriesSection(featured, 'Cerita Pilihan')}</View> */}
          {/* New stories */}
          {/* <View style={{ marginTop: 15 }}>
            {StoriesSection(myStories, 'Cerita Baru')}
          </View> */}
          {/* Most Popular Stories */}
          {/* <View style={{ marginTop: 15 }}>
            {StoriesSection(mostPopular, 'Terpopuler')}
          </View> */}
          {/* Categories Section */}
          {/* <View>{StoriesList()}</View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
