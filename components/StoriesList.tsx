import React, { useState, useEffect } from 'react';
import {
    Image,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {
    StoriesListView,
    ButtonRowView,
    StoriesRowView,
    StoriesInfo,
    StoriesNameText,
    StoriesAuthorText,
    SeoView,
    StoriesSeo,
    SeoPageText,
    GenreView,
    GenreBoxView,
    SeoGenreText,
    BookmarkButton,
    ViewFooterList,
    ButtonFooterList,
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import SkeletonList from '../components/SkeletonList';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { NumberToK } from './helper/NumberToK';
import SkeletonList from './ui/SkeletonList';

const categoriesData = [
    { id: 1, name: 'Legenda', is_active: 2 },
    { id: 2, name: 'Mite', is_active: 2 },
    { id: 3, name: 'Fabel', is_active: 2 },
    { id: 4, name: 'Hikayat', is_active: 2 },
    { id: 5, name: 'Sage', is_active: 2 },
    { id: 6, name: 'Parabel', is_active: 2 },
    { id: 7, name: 'Jenaka', is_active: 2 },
];

const StoriesList = () => {
    const navigation = useNavigation();
    const [myStories, setMyStories] = useState([]);
    const [categories, setCategories] = useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);
    const [keyword, setKeyword] = useState('jenaka,mite');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(
                'https://bogorstore.com/agoose/api/posts/categories?keyword=' +
                keyword +
                '&page=' +
                offset,
            )
            .then(res => {
                // offset === 1
                //   ? setMyStories(res.data.data)
                //   : setMyStories([...myStories, ...res.data.data]);
                // console.log(myStories.categories);
                setOffset(offset + 1);
                setMyStories([...myStories, ...res.data.data]);
                saveData(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                AsyncStorage.getItem('saveDatalist', (error, data) => {
                    if (data) {
                        setMyStories(JSON.parse(data));
                        setLoading(false);
                    }
                });
                console.log(err);
            });
    };

    const saveData = async data => {
        try {
            await AsyncStorage.setItem('saveDatalist', JSON.stringify(data));
        } catch (e) {
            console.log(e + 'Failed to save the data to the storage');
        }
    };

    const fetchCategories = keyword => {
        setLoading(true);
        axios
            .get(
                'https://bogorstore.com/agoose/api/posts/categories?keyword=' + keyword,
            )
            .then(res => {
                // offset === 1
                //   ? setMyStories(res.data.data)
                //   : setMyStories([...myStories, ...res.data.data]);
                // console.log('cek offsset');
                // console.log(myStories.categories);
                setOffset(2);
                setMyStories(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const buttonCategories = (id, keyword) => {
        setSelectedCategory(id);
        setKeyword(keyword);
        fetchCategories(keyword);
        setOffset(1);
    };

    const renderCategories = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, marginRight: Sizes.padding }}
                onPress={() => buttonCategories(item.id, item.name)}>
                {selectedCategory == item.id && (
                    <Text
                        style={{ ...Fonts.h2, color: Colors.darkBlue, fontWeight: 'bold' }}>
                        {item.name}
                    </Text>
                )}
                {selectedCategory != item.id && (
                    <Text style={{ ...Fonts.h2, color: Colors.lightGray }}>
                        {item.name}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    const renderItem = (item) => {
        return (
            <StoriesListView>
                <StoriesRowView>
                    <ButtonRowView
                        // onPress={() =>
                        //     navigation.navigate('StoriesDetail', {
                        //         stories: item,
                        //     })}
                        >
                    {/* Book Cover */}
                    <Image
                        source={{ uri: item.thumbnail }}
                        resizeMode="cover"
                        style={{ width: 100, height: 150, borderRadius: 10 }}
                    />
                    </ButtonRowView>

                    <StoriesInfo>
                        <ButtonRowView
                            // onPress={() =>
                            //     navigation.navigate('StoriesDetail', {
                            //         stories: item,
                            //     })}
                                >
                            {/* Book name and author */}
                            <View>
                                <StoriesNameText numberOfLines={2}>
                                    {item.title}
                                </StoriesNameText>
                                <StoriesAuthorText>{item.channelTitle}</StoriesAuthorText>
                            </View>
                        </ButtonRowView>

                        {/* Book Info */}
                        <StoriesSeo>
                            <SeoView
                                source={require('../assets/icons/heart.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>{Math.floor(item.views / 1.5)}</SeoPageText>

                            <SeoView
                                source={require('../assets/icons/watch.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>{item.views}</SeoPageText>

                            <SeoView
                                source={require('../assets/icons/chat.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>0</SeoPageText>
                        </StoriesSeo>

                        <GenreView>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {item.categories.map((name, key) => (
                                    <GenreBoxView key={key}>
                                        <SeoGenreText>{name}</SeoGenreText>
                                    </GenreBoxView>
                                ))}
                            </ScrollView>
                        </GenreView>
                    </StoriesInfo>
                </StoriesRowView>

            </StoriesListView>
        );
    };

    const renderFooter = () => {
        return (
            <ViewFooterList>
                <ButtonFooterList activeOpacity={0.9} onPress={fetchData}>
                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
                        Lebih banyak
                    </Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </ButtonFooterList>
            </ViewFooterList>
        );
    };

    return (
        <View style={{ marginTop: Sizes.padding }}>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: Sizes.padding }}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCategories}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
                <Icon
                    name="chevron-forward-outline"
                    size={30}
                    color={Colors.lightBlue}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginTop: Sizes.radius,
                    paddingLeft: Sizes.padding,
                    marginBottom: 200,
                }}>
                {loading && offset === 1 ? (
                    <SkeletonList />
                ) : (
                    <>
                        {myStories.map((item) => renderItem(item))}
                        {/* Render Footer */}
                        {renderFooter()}
                    </>
                )}
            </View>
        </View>
    );
};

export default StoriesList;
