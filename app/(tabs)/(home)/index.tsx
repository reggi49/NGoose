import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import StoriesChannel from '@/components/StoriesChannel';
import CarouselHeader from '@/components/CarouselHeader';
import StoriesSection from '@/components/StoriesSection';
import StoriesList from '@/components/StoriesList';

import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://bogorstore.com/agoose/api/';

export default function HomeScreen() {
  const [storiesChannel, setstoriesChannel] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [carousel, setCarousel] = useState(null);
  const [myStories, setMyStories] = useState(null);
  const [mostPopular, setmostPopular] = useState(null);
  const colorScheme = useColorScheme();

  const fetchstoriesChannel = () => {
    axios
      .get('/posts/stories')
      .then(res => {
        // console.log('data1',res.data);
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
  
  const savestoriesChannel = async (data: any) => {
    try {
      await AsyncStorage.setItem('savestoriesChannel', JSON.stringify(data));
    } catch (e) {
      console.log(e + 'Failed to save the Stories Chaneel to the storage');
    }
  };
  
  const fetchFeatured = (limit: any) => {
    axios
      .get('/posts/featured?limit=', limit)
      .then(res => {
        setCarousel(res.data.data.slice(0, 3));
        setFeatured(res.data.data.slice(3, 31));
        saveFeatured(res.data.data);
      })
      .catch(err => {
        AsyncStorage.getItem('saveFeatured', (error, data) => {
          if (data) {
            setCarousel(JSON.parse(data).slice(0, 3));
            setFeatured(JSON.parse(data).slice(3, 31));
          }
        });
        console.log(err);
      });
  };

  const saveFeatured = async (data: any) => {
    try {
      await AsyncStorage.setItem('saveFeatured', JSON.stringify(data));
    } catch (e) {
      console.log(e + 'Failed to save the Featured to the storage');
    }
  };

  const fetchData = () => {
    axios
      .get('/posts')
      .then(res => {
        //   console.log(res.data);
        setMyStories(res.data.data);
        saveData(res.data.data);
      })
      .catch(err => {
        AsyncStorage.getItem('saveData', (error, data) => {
          if (data) {
            setMyStories(JSON.parse(data));
          }
        });
        Alert.alert('Tidak Ada Koneksi Internet');
        console.log(err);
      });
  };
  
  const saveData = async data => {
    try {
      await AsyncStorage.setItem('saveData', JSON.stringify(data));
    } catch (e) {
      console.log(e + 'Failed to save the data to the storage');
    }
  };

  const fetchPopular = () => {
    axios
      .get('/posts/mostpopular')
      .then(res => {
        // console.log(res.data);
        setmostPopular(res.data.data);
        savePopular(res.data.data);
      })
      .catch(err => {
        AsyncStorage.getItem('savePopular', (error, data) => {
          if (data) {
            setmostPopular(JSON.parse(data));
          }
        });
        console.log(err);
      });
  };

  const savePopular = async data => {
    try {
      await AsyncStorage.setItem('savePopular', JSON.stringify(data));
    } catch (e) {
      console.log(e + 'Failed to save the Popular to the storage');
    }
  };

  useEffect(() => {
    fetchstoriesChannel();
    fetchFeatured(5);
    fetchData();
    fetchPopular();

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
          {CarouselHeader(carousel)}
          {/* My Stories */}
          <View>{StoriesSection(featured, 'Cerita Pilihan')}</View>
          {/* New stories */}
          <View style={{ marginTop: 15 }}>
            {StoriesSection(myStories, 'Cerita Baru')}
          </View>
          {/* Most Popular Stories */}
          <View style={{ marginTop: 15 }}>
            {StoriesSection(mostPopular, 'Terpopuler')}
          </View>
          {/* Categories Section */}
          <View>{StoriesList()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
